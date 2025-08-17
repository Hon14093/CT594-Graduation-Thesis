import { getDockById } from "./model/Dock.js";
import { getLaptopById } from "./model/Laptop.js";
import { getMonitorById } from "./model/Monitor.js";
import { getRamById } from "./model/Ram.js";
import { getStorageById } from "./model/Storage.js";
import { getCableById } from "./model/Cable.js";
import { getAdapterById } from "./model/Adapter.js";

const portVersionRank = {
  // USB
    "2.0": 1,
    "3.0": 2,
    "3.1 Gen 1": 2,
    "3.2 Gen 1": 2,
    "3.1 Gen 2": 3,
    "3.2 Gen 2": 3,
    "3.2 Gen 2x2": 4,
    "USB4": 5,
    "4.0": 5,

    // Thunderbolt
    "Thunderbolt 3": 5,
    "Thunderbolt 4": 6
};

function normalizeVersion(version) {
    return version.trim()
        .replace(/^usb\s*/i, "")
        .replace(/gen\s*/i, "Gen ")
        .replace(/\s{2,}/g, " ")
        .replace(/^thunderbolt/i, "Thunderbolt")
        .toUpperCase()
        .replace("GEN ", "Gen ")
        .replace(/\s+/g, " ")
        .trim();
}

// currently used for portable storage
function comparePortVersions(v1, v2) {
    const norm1 = normalizeVersion(v1);
    const norm2 = normalizeVersion(v2);
    const r1 = portVersionRank[norm1] ?? 0;
    const r2 = portVersionRank[norm2] ?? 0;

    if (r1 > r2) return 1;
    if (r1 < r2) return -1;
    return 0;
}


export const compatibilityCheck = async (req,res) => {
    try {
        const { laptop_id } = req.params;
        const { ram_id, storage_id, monitor_id, dock_id, adapter_id, cable_id } = req.query;
        const laptop = await getLaptopById(laptop_id);
        let response = [];

        if (dock_id && monitor_id) {
            // this uses adapter and cable as fall backs
            const temp = await checkDockWithMonitor(dock_id, monitor_id, laptop, adapter_id, cable_id);
            response = response.concat(temp);
        } else if ((adapter_id || cable_id) && monitor_id) {
            let temp1 = [];
            let temp2 = [];

            if (adapter_id) {
                temp1 = await checkAdapterWithMonitor(adapter_id, monitor_id, laptop)
            }

            if (cable_id) {
                temp2 = await checkCableWithMonitor(cable_id, monitor_id, laptop)
            }
            
            response = response.concat(temp1)
            response = response.concat(temp2)
        } else if (monitor_id) {
            response.push(await checkMonitor(monitor_id, laptop));
        } else if (dock_id) {
            response.push(await checkDock(dock_id, laptop));
        } else if (adapter_id || cable_id) {
            if (adapter_id) response.push(await checkAdapter(adapter_id, laptop));
            if (cable_id) response.push(await checkCable(cable_id, laptop));
        }
        
        if (ram_id) response.push(await checkRam(ram_id, laptop));
        if (storage_id) {
            const results = await checkStorage(storage_id, laptop);
            response = response.concat(results)
        }
        
        console.log(response)
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Checking RAM is done -----------------------------------------------------------------
const checkRam = async (ram_id, laptop) => {
    const ram = await getRamById(ram_id);

    if (laptop.ram_slots === 0) {
        return {
            category: "RAM",
            status: 0,
            message: "RAM không tương thích: Laptop không hỗ trợ nâng cấp RAM!"
        };
    }

    if (ram.ram_type !== laptop.ram_type) {
        return {
            category: "RAM",
            status: 0,
            message: "RAM không tương thích: Khác loại RAM!"
        };
    }

    const totalRam = ram.capacity_gb + laptop.ram_installed;
    if (totalRam > laptop.max_ram) {
        return {
            category: "RAM",
            status: 0,
            message: "RAM không tương thích: Vượt quá dung lượng RAM laptop hỗ trợ!"
        };
    }

    if (ram.frequency_mhz !== laptop.frequency_mhz) {
        return {
            category: "RAM",
            status: 2,
            message: "Cảnh báo: Tốc độ RAM không giống nhau! Laptop sẽ hoạt động với tốc độ thấp nhất trong 2 thanh RAM!"
        };
    }

    if (laptop.ram_slots === 1) {
        return {
            category: "RAM",
            status: 2,
            message: "Cảnh báo: Laptop chỉ có 1 khe RAM!"
        };
    }

    return {
        category: "RAM",
        status: 1,
        message: "Tương thích RAM: RAM phù hợp với laptop!"
    };
};

const PORT_STANDARDS = {
    "HDMI": {
        "1.4": { maxResolution: "3840x2160@30Hz", maxRefresh: 30 },
        "2.0": { maxResolution: "3840x2160@60Hz", maxRefresh: 60 },
        "2.1": { maxResolution: "7680x4320@60Hz", maxRefresh: 120 }
    },
    "DisplayPort": {
        "1.2": { maxResolution: "3840x2160@60Hz", maxRefresh: 60 },
        "1.4": { maxResolution: "7680x4320@60Hz", maxRefresh: 120 },
        "2.0": { maxResolution: "7680x4320@120Hz", maxRefresh: 240 }
    }
};

// helper function for checkMonitor()
function formatPortList(ports) {
    if (ports.length === 1) return ports[0];
    if (ports.length === 2) return ports.join(' hoặc ');
    return ports.slice(0, -1).join(', ') + ' hoặc ' + ports[ports.length - 1];
}

// Almost done, could add check cable for lightning port in the future ----------------------------------------------
const checkMonitor = async (monitor_id, laptop) => {
    const monitor = await getMonitorById(monitor_id);
    const laptopHdmiPort = laptop.ports?.find(port => port.type === "HDMI") || null; // this is an Object
    const laptopUSB_C = laptop.ports?.find(port => port.type === "USB-C") || null;
    const compatiblePorts = [];
    const midCompatiblePorts = [];
    const noCableInBox = [];

    if (laptop?.ports?.some(port => port.type === "Thunderbolt 4" || port.type === "Thunderbolt 5")) {
        // const tbVersion = laptop.ports["Thunderbolt 4"];
        if (monitor?.ports?.display_port) {
            noCableInBox.push(`Thunderbolt (DP 1.4)`);
        }
    }

    if (monitor.ports.hdmi && laptopHdmiPort) {
        const laptopHdmiVer = parseFloat(laptopHdmiPort.version);
        const monitorHdmiVer = parseFloat(monitor.ports.hdmi[0].version);

        if (laptopHdmiVer >= monitorHdmiVer) {
            compatiblePorts.push(`HDMI ${laptopHdmiPort.version}`);
        } else {
            const standard = PORT_STANDARDS.HDMI[laptopHdmiPort.version];
            if (monitor.refresh_rate_hz <= standard.maxRefresh) {
                midCompatiblePorts.push(`HDMI ${laptop.ports.HDMI}`);
            }
        }
    }

    // if (monitor.ports.display_port && laptop.ports["USB-C"].includes("DP")) {
    if (monitor.ports.display_port && laptopUSB_C.supports?.includes("DP")) {
        noCableInBox.push("USB-C/DisplayPort");
        console.log('flag 3')
    }

    if (compatiblePorts.length > 0) {
        return {
            category: "Màn hình",
            status: 1,
            message: `Màn hình tương thích qua cổng: ${formatPortList(compatiblePorts)}`
        } 
    } else if (midCompatiblePorts.length > 0) {
        return {
            category: "Màn hình",
            status: 2,
            message: `Cảnh báo: Không thể đạt tối đa hiệu năng khi dùng cổng ${formatPortList(midCompatiblePorts)}!`
        } 
    } else if (noCableInBox.length > 0) {
        return {
            category: "Màn hình",
            status: 3,
            message: `Cảnh báo: Nhà sản xuất màn hình không cung cấp dây cáp ${formatPortList(noCableInBox)} sang HDMI/DP`
        }
    } else {
        return {
            category: "Màn hình",
            status: 0,
            message: "Màn hình không tương thích: Không tìm thấy cổng tương thích!"
        }
    }
}

// check storage -----------------------------------------------------------------------------------
function isPortCompatible(laptop, storage) {
    // Extract port type and version from storage.interface
    const [storagePortType, ...storagePortDetails] = storage.interface.split(" ");
    const storagePortVersion = storagePortDetails.join(" ").trim();
    const portKey = storagePortType.toUpperCase();

    // const laptopPorts = laptop.ports?.[portKey];
    const laptopPorts = laptop.ports?.find((port) => port.type === portKey);
    if (!laptopPorts) {
        return `Không tương thích: Laptop không có cổng ${storagePortType}!`
    }

    // Check version
    // -1 => component port is newer than laptop port
    // 0 => same port version (compatible)
    // 1 => component port is older (compatible) 
    if (comparePortVersions(laptopPorts.version, storagePortVersion) !== -1) {
        return `Tương thích: Cổng ${storagePortType} ${storagePortVersion} phù hợp với laptop!`
    }


    // Check for same port type but different speed/standard (partial match)
    return `Cảnh báo: Ổ cứng không sử dụng được tối đa công xuất do khác phiên bản! (SSD: ${storagePortType} ${storagePortVersion}, laptop: ${laptopPorts.type} ${laptopPorts.version})`
}


const checkStorage = async (storage_id, laptop) => {
    const storage = await getStorageById(storage_id);

    if (storage.form_factor !== "Di động") {
        if (laptop.storage_slots === 1) {
            if (storage.capacity_gb > laptop.max_storage_gb) {
                return [
                    {
                        category: "Lưu trữ",
                        status: 0,
                        message: "Không tương thích: Vượt quá dung lượng lưu trữ laptop hỗ trợ!"
                    }
                ]
            } 
            
            return [
                {
                    category: "Lưu trữ",
                    status: 2,
                    message: "Cảnh báo: Laptop chỉ có 1 khe lưu trữ!"
                },
                {
                    category: "Lưu trữ",
                    status: 1,
                    message: "Ổ cứng tương thích!"
                }
            ]
        }

        if (laptop.storage_installed_gbs + storage.capacity_gb > laptop.max_storage_gb) {
            return [{
                category: "Lưu trữ",
                status: 0,
                message: "Không tương thích: Vượt quá dung lượng lưu trữ laptop hỗ trợ!"
            }];
        }

        return [{
            category: "Lưu trữ",
            status: 1,
            message: "Ổ cứng tương thích!"
        }];
    }

    // Portable storage
    const checkPort = isPortCompatible(laptop, storage);
    return {
        category: "Lưu trữ",
        status: checkPort.includes("Cảnh báo") ? 2 : checkPort.includes("Không tương thích") ? 0 : 1,
        message: checkPort
    };
};


// check dock ----------------------------------------------------------------------
const checkDock = async (dock_id, laptop) => {
    const dock = await getDockById(dock_id);
    const dockPortType = dock.connection_port; // USB-C 3.0
    const [dockType, ...versionParts] = dockPortType.split(' ');
    const dockVersion = versionParts.join(' ');

    // const laptopPorts = laptop.ports?.[dockType];
    const laptopPorts = laptop.ports?.find((port) => port.type === dockType);
    if (!laptopPorts || laptopPorts.length === 0) {
        return {
            category: "USB Dock",
            status: 0,
            message: `Dock không tương thích: Laptop không có cổng ${dockType}!`
        }
    }

    // -1 => component port is newer than laptop port
    // 0 => same port version (compatible)
    // 1 => component port is older (compatible) 
    if (comparePortVersions(laptopPorts.version, dockVersion) !== -1) {
        return {
            category: "USB Dock",
            status: 1,
            message: `Tương thích USB dock: Cổng ${dockType} ${dockVersion} phù hợp!`
        }
    }

    return {
        category: "USB Dock",
        status: 2,
        laptopPorts: dockVersion,
        message: `Cảnh báo: Laptop có cổng ${dockType} nhưng khác phiên bản (Dock: ${dockVersion}, 
            Laptop: ${laptopPorts.version })`
    };
}

const checkDockWithMonitor1 = async (dock_id, monitor_id, laptop) => {
    const dock = await getDockById(dock_id);
    const monitor = await getMonitorById(monitor_id);
    const compatiblePorts = [];
    const midCompatiblePorts = [];
    const allResults = [];
    const dock_display_output = checkDockDisplayPorts(dock);
    // {
    //     hdmi: { exists: true, versions: [ '1.4' ], total: 1 },
    //     displayPort: { exists: false, versions: [], total: 0 }
    // }

    const monitorResult = await checkMonitor(monitor_id, laptop);
    const dockResult = await checkDock(dock_id, laptop);

    // if (monitorResult.status !== 0) {
    //     allResults.push(monitorResult);
    // }
    
    // allResults.push(dockResult);
    // if (dockResult.status === 0) {
        
    // }

    if (dockResult.status === 1 && monitorResult.status !== 1) {
        if (dock_display_output.hdmi.exists) {
            const monitorHdmiVer = parseFloat(monitor.ports.hdmi[0].version);
            const dockHdmiVers = dock_display_output.hdmi.versions.map((version) => parseFloat(version));

            const findVer = dockHdmiVers.some((version) => version === monitorHdmiVer);
            console.log('flag 1', findVer, dockHdmiVers, monitorHdmiVer)
            if (findVer) {
                allResults.push({
                    status: 1,
                    message: `Tương thích: Màn hình có thể được kết nối qua dock bằng cổng HDMI ${dockHdmiVers}`
                })
            }
        }

        if (dock_display_output.displayPort.exists) {
            const monitorDPVer = parseFloat(monitor.ports.display_port[0].version);
            const dockDPVers = dock_display_output.displayPort.versions.map((version) => parseFloat(version));

            const findVer = dockDPVers.some((version) => version === monitorDPVer);
            if (findVer) {
                allResults.push({
                    status: 1,
                    message: `Tương thích: Màn hình có thể được kết nối qua dock bằng cổng HDMI ${dockDPVers}`
                })
            }
        }
    } else {
        allResults.push(monitorResult);
        allResults.push(dockResult);
    }

    // allResults.push(monitorResult);
    // allResults.push(dockResult);

    console.log('checking results', monitorResult, dockResult, allResults);

    return allResults;
}

function checkDockDisplayPorts(device) {
    // console.log('device', device)
    if (!device?.hdmi?.length && !device?.display_port?.length) {
        return {
            hdmi: { exists: false, versions: [], total: 0 },
            displayPort: { exists: false, versions: [], total: 0 }
        };
    }

    const result = {
        hdmi: { exists: false, versions: [], total: 0 },
        displayPort: { exists: false, versions: [], total: 0 }
    };

    device.hdmi?.forEach(port => {
        result.hdmi.exists = true;
        result.hdmi.versions.push(port.version);
        result.hdmi.total += port.quantity || 0;
    })

    device.display_port?.forEach(port => {
        result.displayPort.exists = true;
        result.displayPort.versions.push(port.version);
        result.displayPort.total += port.quantity || 0;
    })

    console.log('display outputs', result)

    return result;
}

const checkDockWithMonitor = async (dock_id, monitor_id, laptop, adapter_id = null, cable_id = null) => {
    const dock = await getDockById(dock_id);
    const monitor = await getMonitorById(monitor_id);

    const allResults = [];
    const dockResult = await checkDock(dock_id, laptop);
    const monitorResult = await checkMonitor(monitor_id, laptop);
    const dockDisplay = checkDockDisplayPorts(dock); // Extract HDMI/DP availability

    allResults.push({ ...dockResult, category: "USB Dock" });
    allResults.push({ ...monitorResult, category: "Màn hình" });

    const monitorHdmiVer = monitor.ports?.hdmi ? parseFloat(monitor.ports.hdmi[0].version) : null;
    const monitorDPVer = monitor.ports?.display_port ? parseFloat(monitor.ports.display_port[0].version) : null;

    const additionalMessages = [];

    const dockHasNoOutput = !dockDisplay.hdmi.exists && !dockDisplay.displayPort.exists;
    if (dockHasNoOutput) {
        additionalMessages.push({
            category: "USB Dock",
            status: 0,
            message: "Không tương thích: Dock không có cổng xuất hình (HDMI/DisplayPort) để kết nối màn hình!"
        });
    }

    if (dockDisplay.hdmi.exists && monitorHdmiVer !== null) {
        const dockHdmiVers = dockDisplay.hdmi.versions.map(parseFloat);
        const hasExact = dockHdmiVers.includes(monitorHdmiVer);
        const hasOlder = dockHdmiVers.some(v => v < monitorHdmiVer);
        const hasNewer = dockHdmiVers.some(v => v > monitorHdmiVer);

        if (hasExact || hasNewer) {
            additionalMessages.push({
                category: "USB Dock",
                status: 1,
                message: `Tương thích: Màn hình có thể kết nối qua dock bằng HDMI ${monitorHdmiVer}`
            });
        } else if (hasOlder) {
            additionalMessages.push({
                category: "USB Dock",
                status: 2,
                message: `Cảnh báo: Dock có HDMI phiên bản thấp hơn, hiệu suất màn hình có thể bị giới hạn`
            });
        } else {
            additionalMessages.push({
                category: "USB Dock",
                status: 0,
                message: `Không tương thích: Dock có HDMI nhưng không hỗ trợ phiên bản ${monitorHdmiVer}`
            });
        }
    }

    if (dockDisplay.displayPort.exists && monitorDPVer !== null) {
        const dockDPVers = dockDisplay.displayPort.versions.map(parseFloat);
        const hasExact = dockDPVers.includes(monitorDPVer);
        const hasOlder = dockDPVers.some(v => v < monitorDPVer);
        const hasNewer = dockDPVers.some(v => v > monitorDPVer);

        if (hasExact || hasNewer) {
            additionalMessages.push({
                category: "USB Dock",
                status: 1,
                message: `Tương thích: Màn hình có thể kết nối qua dock bằng DisplayPort ${monitorDPVer}`
            });
        } else if (hasOlder) {
            additionalMessages.push({
                category: "USB Dock",
                status: 2,
                message: `Cảnh báo: Dock có DisplayPort phiên bản thấp hơn (cần ${monitorDPVer}), hiệu suất có thể bị giới hạn`
            });
        } else {
            additionalMessages.push({
                category: "USB Dock",
                status: 0,
                message: `Không tương thích: Dock có DisplayPort nhưng không hỗ trợ phiên bản ${monitorDPVer}`
            });
        }
    }

    if (adapter_id) {
        const adapter = await getAdapterById(adapter_id);
        const { input_port, output_port } = adapter;

        const fromTypeKey = input_port.toLowerCase();
        const toTypeKey = output_port.split(" ")[0] === "DisplayPort" ? "display_port" : "hdmi";
        const laptopHasFrom = laptop.ports?.some(port => port.type.toLowerCase() === fromTypeKey.split(" ")[0]);
        const monitorHasTo = monitor.ports?.[toTypeKey];

        if (laptopHasFrom && monitorHasTo) {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 1,
                message: `Tương thích với màn hình: Màn hình có thể kết nối với laptop bằng cáp ${input_port} → ${output_port}`
            });
        } else {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 0,
                message: `Không thể giúp kết nối: Không tìm thấy ${input_port} ở laptop hoặc ${output_port} ở màn hình`
            });
        }
    }

    if (cable_id) {
        const cable = await getCableById(cable_id);
        const { connector_a, connector_b } = cable;

        const fromTypeKey = connector_a.toLowerCase(); // ex: usb-c 3.2 gen 2
        const toTypeKey = connector_b.split(" ")[0] === "DisplayPort" ? "display_port" : "hdmi";
        const laptopHasFrom = laptop.ports?.some(port => port.type.toLowerCase() === fromTypeKey.split(" ")[0]);
        const monitorHasTo = monitor.ports?.[toTypeKey];

        if (laptopHasFrom && monitorHasTo) {
            additionalMessages.push({
                category: "Dây cáp",
                status: 1,
                message: `Tương thích với màn hình: Màn hình có thể kết nối với laptop bằng cáp ${connector_a} → ${connector_b}`
            });
        } else {
            additionalMessages.push({
                category: "Dây cáp",
                status: 0,
                message: `Cáp không thể giúp kết nối: Không tìm thấy ${connector_a} ở laptop hoặc ${connector_b} ở màn hình`
            });
        }
    }

    return allResults.concat(additionalMessages);
};

// check cable ----------------------------------------------------------------------
const checkCable = async (cable_id, laptop) => {
    const cable = await getCableById(cable_id);

    const parseConnector = (connector) => {
        const parts = connector.split(" ");
        const portType = parts[0];                  // e.g., USB-C
        const portVersion = parts.slice(1).join(" "); // e.g., 3.2 Gen 2
        return { portType, portVersion };
    };

    const from = parseConnector(cable.connector_a);
    const to = parseConnector(cable.connector_b);

    const laptopPorts = laptop.ports?.find((port) => port.type === from.portType);

    if (!laptopPorts) {
        return {
            category: "Dây cáp",
            status: 0,
            message: `Cáp không tương thích: Laptop không có cổng ${from.portType}`
        };
    }

    // const versionMatch = comparePortVersions(from.portVersion, laptopPorts.version);
    const versionMatch = comparePortVersions( laptopPorts.version, from.portVersion);
    // console.log(from, laptopPorts, versionMatch)

    return {
        category: "Dây cáp",
        status: versionMatch > -1 ? 1 : 2,
        message: versionMatch > -1
            ? `Tương thích: Cáp ${cable.connector_a} → ${cable.connector_b} phù hợp với laptop`
            : `Cảnh báo: Laptop có cổng ${from.portType} nhưng không hỗ trợ phiên bản ${from.portVersion}`
    };
};

const checkCableWithMonitor = async (cable_id, monitor_id, laptop) => {
    const cable = await getCableById(cable_id);
    const monitor = await getMonitorById(monitor_id);

    const allResults = [];
    const cableResult = await checkCable(cable_id , laptop); // check cable with laptop
    const monitorResult = await checkMonitor(monitor_id, laptop); // check monitor with laptop
    
    allResults.push({ ...cableResult, category: "Dây cáp" });
    allResults.push({ ...monitorResult, category: "Màn hình" });

    const additionalMessages = [];

    const monitorHdmiVer = monitor.ports?.hdmi ? parseFloat(monitor.ports.hdmi[0].version) : null;
    const monitorDPVer = monitor.ports?.display_port ? parseFloat(monitor.ports.display_port[0].version) : null;

    if (cable.connector_b.includes("DisplayPort"))  {
        const cableDPVer = cable.connector_b.split(" ")[1]; // ex: 1.2, 1.4
        
        if (parseFloat(cableDPVer) >= monitorDPVer) {
            additionalMessages.push({
                category: "Dây cáp",
                status: 1,
                message: `Tương thích với màn hình: Màn hình có thể kết nối với laptop bằng cáp ${cable.connector_a} → ${cable.connector_b}`
            })
        } else {
            additionalMessages.push({
                category: "Dây cáp",
                status: 2,
                message: `Cảnh báo: Màn hình không sử dụng được tối đa tần số quét do khác biệt phiên bản với dây cáp! (Dây cáp: ${cable.connector_b}, màn hình: ${monitor.ports.display_port} ${monitor.ports.display_port[0].version}` 
            })
        }
    }

    if (cable.connector_b.includes("HDMI")) {
        const cableHdmiVer = cable.connector_b.split(" ")[1];

        if (parseFloat(cableHdmiVer) >= monitorHdmiVer) {
            additionalMessages.push({
                category: "Dây cáp",
                status: 1,
                message: `Tương thích với màn hình: Màn hình có thể kết nối với laptop bằng cáp ${cable.connector_a} → ${cable.connector_b}`
            })
        } else {
            additionalMessages.push({
                category: "Dây cáp",
                status: 2,
                message: `Cảnh báo: Màn hình không sử dụng được tối đa tần số quét do khác biệt phiên bản với dây cáp! (Dây cáp: ${cable.connector_b}, màn hình: ${monitor.ports.hdmi} ${monitor.ports.hdmi[0].version}` 
            })
        }
    }

    if (!cable.connector_b.includes("HDMI") && !cable.connector_b.includes("DisplayPort")) {
        additionalMessages.push({
            category: "Dây cáp",
            status: 0,
            message: "Không tương thích với màn hình: Không kết nối màn hình với laptop qua dây cáp do không tìm thấy cổng HDMI và DisplayPort trên màn hình hoặc dây cáp!"
        })
    }

    console.log(additionalMessages)
    return allResults.concat(additionalMessages)
}

// check adapter ----------------------------------------------------------------------
const checkAdapter = async (adapter_id, laptop) => {
    const adapter = await getAdapterById(adapter_id);

    const parsePort = (portString) => {
        const parts = portString.split(" ");
        const portType = parts[0]; // e.g., "USB-A"
        const portVersion = parts.slice(1).join(" "); // e.g., "3.0"
        return { portType, portVersion };
    };

    const { portType: inputType, portVersion: inputVersion } = parsePort(adapter.input_port);
    const laptopPorts = laptop.ports?.find((port) => port.type === inputType);

    if (!laptopPorts) {
        return {
            category: "Bộ chuyển đổi",
            status: 0,
            message: `Adapter không tương thích: Laptop không có cổng ${inputType}`
        };
    }

    const versionMatch = comparePortVersions(laptopPorts.version, inputVersion);

    return {
        category: "Bộ chuyển đổi",
        status: versionMatch > -1 ? 1 : 2,
        message: versionMatch > -1
            ? `Tương thích: Adapter ${adapter.input_port} → ${adapter.output_port} phù hợp với laptop`
            : `Cảnh báo: Laptop có cổng ${inputType} nhưng không hỗ trợ phiên bản ${inputVersion}`
    };
};

const checkAdapterWithMonitor = async (adapter_id, monitor_id, laptop) => {
    const adapter = await getAdapterById(adapter_id);
    const monitor = await getMonitorById(monitor_id);

    const allResults = [];
    const adapterResult = await checkAdapter(adapter_id, laptop);
    const monitorResult = await checkMonitor(monitor_id, laptop); // check monitor with laptop
    
    allResults.push({ ...adapterResult, category: "Bộ chuyển đổi" });
    allResults.push({ ...monitorResult, category: "Màn hình" });

    const additionalMessages = [];

    const monitorHdmiVer = monitor.ports?.hdmi ? parseFloat(monitor.ports.hdmi[0].version) : null;
    const monitorDPVer = monitor.ports?.display_port ? parseFloat(monitor.ports.display_port[0].version) : null;

    if (adapter.output_port.includes("DisplayPort"))  {
        const adapterDPVer = adapter.output_port.split(" ")[1]; // ex: 1.2, 1.4
        
        if (parseFloat(adapterDPVer) >= monitorDPVer) {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 1,
                message: "Tương thích với màn hình: Có thể kết nối màn hình với laptop qua bộ chuyển đổi."
            })
        } else {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 2,
                message: `Cảnh báo: Màn hình không sử dụng được tối đa tần số quét do khác biệt phiên bản với bộ chuyển đổi! (Bộ chuyển đổi: ${adapter.output_port}, màn hình: ${monitor.ports.display_port} ${monitor.ports.display_port[0].version}` 
            })
        }
    }

    if (adapter.output_port.includes("HDMI")) {
        const adapterHdmiVer = adapter.output_port.split(" ")[1];

        if (parseFloat(adapterHdmiVer) >= monitorHdmiVer) {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 1,
                message: "Tương thích với màn hình: Có thể kết nối màn hình với laptop qua bộ chuyển đổi"
            })
        } else {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 2,
                message: `Cảnh báo: Màn hình không sử dụng được tối đa tần số quét do khác biệt phiên bản với bộ chuyển đổi! (Dây cáp: ${adapter.output_port}, màn hình: ${monitor.ports.hdmi} ${monitor.ports.hdmi[0].version}` 
            })
        }
    }

    if (!adapter.output_port.includes("HDMI") && !adapter.output_port.includes("DisplayPort")) {
        additionalMessages.push({
            category: "Bộ chuyển đổi",
            status: 0,
            message: "Không tương thích với màn hình: Không kết nối màn hình với laptop qua bộ chuyển đổi do không tìm thấy cổng HDMI và DisplayPort trên màn hình hoặc bộ chuyển đổi!"
        })
    }

    console.log(additionalMessages)
    return allResults.concat(additionalMessages)
}
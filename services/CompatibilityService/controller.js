import { getDockById } from "./model/Dock.js";
import { getLaptopById } from "./model/Laptop.js";
import { getMonitorById } from "./model/Monitor.js";
import { getRamById } from "./model/Ram.js";
import { getStorageById } from "./model/Storage.js";
import { getCableById } from "./model/Cable.js";
import { getAdapterById } from "./model/Adapter.js";

export const compatibilityCheck = async (req,res) => {
    try {
        const { laptop_id } = req.params;
        const { ram_id, storage_id, monitor_id, dock_id, adapter_id, cable_id } = req.query;
        const laptop = await getLaptopById(laptop_id);
        let response = [];

        if (dock_id && monitor_id) {
            console.log('dock and monitor are working')
            const temp = await checkDockWithMonitor(dock_id, monitor_id, laptop, adapter_id, cable_id);
            response = response.concat(temp);
        } else if (monitor_id) {
            response.push(await checkMonitor(monitor_id, laptop));
        } else if (dock_id) {
            response.push(await checkDock(dock_id, laptop));
        }
        
        if (ram_id) response.push(await checkRam(ram_id, laptop));
        if (storage_id) response.push(await checkStorage(storage_id, laptop));
        if (adapter_id) response.push(await checkAdapter(adapter_id, laptop));
        if (cable_id) response.push(await checkCable(cable_id, laptop));
        
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
    const compatiblePorts = [];
    const midCompatiblePorts = [];
    const noCableInBox = [];

    if (laptop?.ports?.["Thunderbolt 4"] || laptop?.ports?.["Thunderbolt 5"]) {
        // const tbVersion = laptop.ports["Thunderbolt 4"];
        
        if (monitor?.ports?.display_port) {
            noCableInBox.push(`Thunderbolt (DP 1.4)`);
        }
        
        // if (monitor?.ports?.hdmi && tbVersion >= 3) {
        //     midCompatiblePorts.push(`Thunderbolt ${tbVersion} → HDMI 2.0 (via adapter)`);
        // }
    }

    if (monitor.ports.hdmi && laptop.ports.HDMI) {
        const laptopHdmiVer = parseFloat(laptop.ports.HDMI);
        const monitorHdmiVer = parseFloat(monitor.ports.hdmi);

        if (laptopHdmiVer >= monitorHdmiVer) {
            compatiblePorts.push(`HDMI ${laptop.ports.HDMI}`);
        } else {
            const standard = PORT_STANDARDS.HDMI[laptop.ports.HDMI];
            if (monitor.refresh_rate_hz <= standard.maxRefresh) {
                midCompatiblePorts.push(`HDMI ${laptop.ports.HDMI}`);
            }
        }
    }

    if (monitor.ports.display_port && laptop.ports["USB-C"].includes("DP")) {
        compatiblePorts.push("USB-C/DisplayPort 1.4");
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

    const laptopPorts = laptop.ports?.[portKey];
    if (!laptopPorts) {
        return `Không tương thích: Laptop không có cổng ${storagePortType}!`
    }

    // Check for exact match
    if (laptopPorts.includes(storagePortVersion)) {
        return "Tương thích!"
    }

    // Check for same port type but different speed/standard (partial match)
    return "Cảnh báo: Ổ cứng không sử dụng được tối đa công xuất do khác cổng giao tiếp!"
    // return {
    //     status: "warning",
    //     message: "Storage will not be able to run at max potential due to port differences"
    // };
}


const checkStorage = async (storage_id, laptop) => {
    const storage = await getStorageById(storage_id);

    if (storage.form_factor !== "Di động") {
        
        if (laptop.storage_installed_gbs + storage.capacity_gb > laptop.max_storage_gb) {
            return {
                category: "Lưu trữ",
                status: 0,
                message: "Không tương thích: Vượt quá dung lượng lưu trữ laptop hỗ trợ!"
            };
        }

        if (laptop.storage_slots === 1) {
            return {
                category: "Lưu trữ",
                status: 2,
                message: "Cảnh báo: Laptop chỉ có 1 khe lưu trữ!"
            };
        }

        return {
            category: "Lưu trữ",
            status: 1,
            message: "Ổ cứng tương thích!"
        };
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

    const laptopPorts = laptop.ports?.[dockType];
    if (!laptopPorts || laptopPorts.length === 0) {
        return {
            category: "USB Dock",
            status: 0,
            message: `Dock không tương thích: Laptop không có cổng ${dockType}!`
        }
    }

    if (laptopPorts.includes(dockVersion)) {
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
        message: `Cảnh báo: Laptop có cổng ${dockType} nhưng khác phiên bản (Dock: ${dockVersion}, Laptop: ${laptopPorts.join(", ")})`
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
        console.log('working')
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
    console.log('device', device.hdmi.length)
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

    // device.display_output_ports.forEach(port => {
    //     if (port.type === 'HDMI') {
    //         result.hdmi.exists = true;
    //         result.hdmi.versions.push(port.version);
    //         result.hdmi.total += port.quantity || 0;
    //     }
    //     else if (port.type === 'DisplayPort') {
    //         result.displayPort.exists = true;
    //         result.displayPort.versions.push(port.version);
    //         result.displayPort.total += port.quantity || 0;
    //     }
    // });

    console.log('display outputs', result)

    return result;
    // {
    //     hdmi: { exists: true, versions: [ '2.1', '1.4' ], total: 3 },
    //     displayPort: { exists: true, versions: [ '1.4' ], total: 1 }
    // }
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

        if (hasExact) {
            additionalMessages.push({
                category: "USB Dock",
                status: 1,
                message: `Tương thích: Màn hình có thể kết nối qua dock bằng HDMI ${monitorHdmiVer}`
            });
        } else if (hasOlder) {
            additionalMessages.push({
                category: "USB Dock",
                status: 2,
                message: `Cảnh báo: Dock có HDMI phiên bản thấp hơn (cần ${monitorHdmiVer}), hiệu suất có thể bị giới hạn`
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

        if (hasExact) {
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
        const { input_port, output_port, supported_standards } = adapter;

        const dockSupportedVersions = [
            ...(dockDisplay.hdmi.versions || []),
            ...(dockDisplay.displayPort.versions || []),
        ];

        const monitorHasPort = monitor.ports?.[output_port];
        const dockSupportsAdapter = supported_standards.some(std => {
            const [type, version] = std.split(" ");
            return dockSupportedVersions.includes(version);
        });

        if (dockSupportsAdapter && monitorHasPort) {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 1,
                message: `Tương thích: Màn hình có thể kết nối qua dock bằng adapter ${input_port} → ${output_port}`
            });
        } else {
            additionalMessages.push({
                category: "Bộ chuyển đổi",
                status: 0,
                message: `Adapter không thể giúp kết nối: Dock không hỗ trợ chuẩn ${supported_standards.join(", ")}, hoặc màn hình không có cổng ${output_port}`
            });
        }
    }

    if (cable_id) {
        const cable = await getCableById(cable_id);
        const { from_type, to_type } = cable;

        const fromTypeKey = from_type.toLowerCase();
        const dockHasFrom = dockDisplay[fromTypeKey]?.exists;
        const monitorHasTo = monitor.ports?.[to_type];

        if (dockHasFrom && monitorHasTo) {
            additionalMessages.push({
                category: "Dây cáp",
                status: 1,
                message: `Tương thích: Màn hình có thể kết nối qua dock bằng cáp ${from_type} → ${to_type}`
            });
        } else {
            additionalMessages.push({
                category: "Dây cáp",
                status: 0,
                message: `Cáp không thể giúp kết nối: Không tìm thấy ${from_type} ở dock hoặc ${to_type} ở màn hình`
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

    const laptopPortVersions = laptop.ports?.[from.portType];

    if (!laptopPortVersions) {
        return {
            category: "Dây cáp",
            status: 0,
            message: `Cáp không tương thích: Laptop không có cổng ${from.portType}`
        };
    }

    const versions = Array.isArray(laptopPortVersions)
        ? laptopPortVersions
        : [laptopPortVersions];

    const versionMatch = from.portVersion
        ? versions.includes(from.portVersion)
        : true; // allow partial match if no version given

    return {
        category: "Dây cáp",
        status: versionMatch ? 1 : 2,
        message: versionMatch
            ? `Tương thích: Cáp ${cable.connector_a} → ${cable.connector_b} phù hợp với laptop`
            : `Cảnh báo: Laptop có cổng ${from.portType} nhưng không hỗ trợ phiên bản ${from.portVersion}`
    };
};


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
    const laptopPorts = laptop.ports?.[inputType];

    if (!laptopPorts) {
        return {
            category: "Bộ chuyển đổi",
            status: 0,
            message: `Adapter không tương thích: Laptop không có cổng ${inputType}`
        };
    }

    const versions = Array.isArray(laptopPorts)
        ? laptopPorts
        : [laptopPorts];

    const versionMatch = inputVersion
        ? versions.includes(inputVersion)
        : true;

    return {
        category: "Bộ chuyển đổi",
        status: versionMatch ? 1 : 2,
        message: versionMatch
            ? `Tương thích: Adapter ${adapter.input_port} → ${adapter.output_port} phù hợp với laptop`
            : `Cảnh báo: Laptop có cổng ${inputType} nhưng không hỗ trợ phiên bản ${inputVersion}`
    };
};

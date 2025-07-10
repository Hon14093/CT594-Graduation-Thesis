import { getLaptopById } from "./model/Laptop.js";
import { getMonitorById } from "./model/Monitor.js";
import { getRamById } from "./model/Ram.js";
import { getStorageById } from "./model/Storage.js";

export const compatibilityCheck = async (req,res) => {
    try {
        const { laptop_id } = req.params;
        const { ram_id, storage_id, monitor_id, usb_dock_id, adapter_id, cable_id } = req.query;

        const laptop = getLaptopById(laptop_id)[0];

        let response = [];

        if (ram_id) response.push(checkRam(ram_id, laptop));
        if (monitor_id) response.push(checkMonitor(monitor_id, laptop));
        if (storage_id) response.push(checkStorage(storage_id, laptop));

        // Early testing phase - return the received data
        console.log(response)
        res.status(200).json({
            response
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Checking RAM is done -----------------------------------------------------------------
const checkRam = (ram_id, laptop) => {
    const ram = getRamById(ram_id)[0];
    console.log("RAM: ", ram, laptop.ram_type)

    if (laptop.ram_slots === 0) {
        return {
            status: 0,
            message: "Không tương thích RAM: Laptop không hỗ trợ nâng cấp RAM!"
        }
    }

    if (ram.ram_type !== laptop.ram_type) {
        return {
            status: 0,
            message: "Không tương thích RAM: Khác loại RAM!"
        }
    }

    const totalRam = ram.capacity_gb + laptop.ram_installed;
    if (totalRam > laptop.max_ram) {
        return {
            status: 0,
            message: "Không tương thích RAM: Vượt quá dung lượng RAM laptop hỗ trợ!"
        }
    }

    if (ram.frequency_mhz !== laptop.frequency_mhz) {
        return {
            status: 2,
            message: "Cảnh báo: Tốc độ RAM không giống nhau! Laptop sẽ hoạt động với tốc độ thấp nhất trong 2 thanh RAM!"
        }
    }

    if (laptop.ram_slots === 1) {
        return {
            status: 2,
            message: "Cảnh báo: Laptop chỉ có 1 khe RAM!"
        }
    }

    return {
        status: 1,
        message: "Tương thích RAM: RAM phù hợp với laptop!"
    }
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
const checkMonitor = (monitor_id, laptop) => {
    const monitor = getMonitorById(monitor_id)[0];
    const compatiblePorts = [];
    const midCompatiblePorts = [];

    if (laptop?.ports?.["Thunderbolt 4"] || laptop?.ports?.["Thunderbolt 5"]) {
        // const tbVersion = laptop.ports["Thunderbolt 4"];
        
        if (monitor?.ports?.display_port) {
            compatiblePorts.push(`Thunderbolt (DP 1.4)`);
        }
        
        // if (monitor?.ports?.hdmi && tbVersion >= 3) {
        //     midCompatiblePorts.push(`Thunderbolt ${tbVersion} → HDMI 2.0 (via adapter)`);
        // }
    }

    if (monitor.ports.hdmi && laptop.ports.HDMI === true) {
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
            status: 1,
            message: `Màn hình tương thích qua cổng: ${formatPortList(compatiblePorts)}` 
        } 
    } else if (midCompatiblePorts.length > 0) {
        return {
            status: 2,
            message: `Cảnh báo: Không thể đạt tối đa hiệu năng khi dùng cổng ${formatPortList(midCompatiblePorts)}!`
        } 
    } else {
        return {
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


const checkStorage = (storage_id, laptop) => {
    const storage = getStorageById(storage_id)[0];

    // Check internal SSD
    if (storage.form_factor !== "Portable") {
        if (laptop.storage_installed_gbs + storage.capacity_gb > laptop.max_storage) {
            return "Không tương thích: Vượt quá dung lượng lưu trữ laptop hỗ trợ!"
        }

        if (laptop.storage_slots === 1) {
            return "Cảnh báo: Laptop chỉ có 1 khe lưu trữ!"
        }
    }

    if (storage.form_factor === "Portable") {
        const checkPort = isPortCompatible(laptop, storage);
        return checkPort;
    }

}

// check dock ----------------------------------------------------------------------
const checkDock = (dock_id, laptop) => {}

// check cable ----------------------------------------------------------------------
const checkCable = (cable_id, laptop) => {}

// check adapter ----------------------------------------------------------------------
const checkAdapter = (adapter_id, laptop) => {}
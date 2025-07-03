import { monitor_data } from "../test/monitor-data.js";

export const getMonitorById = (monitor_id) => {
    return monitor_data.filter((item) => item.monitor_id === monitor_id);
}
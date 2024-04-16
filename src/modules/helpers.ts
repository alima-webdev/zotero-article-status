// Helper functions
import { allStatuses, reasonTagPrefix, statusTagPrefix } from "./consts";

export function getItemStatusTags(item: Zotero.Item) {
    // ztoolkit.log("getItemStatusTags")
    const itemTags = item.getTags()
    // ztoolkit.log(itemTags)
    const statusTags = itemTags.filter(obj => {
        return obj.tag.includes(statusTagPrefix)
    })
    // ztoolkit.log(statusTags)
    // ztoolkit.log("End: getItemStatusTags")
    // allStatuses.find(obj => obj == true)
    return statusTags
}

// Get the status from item
export function getItemStatus(item: Zotero.Item) {
    let statusObj = allStatuses.find(obj => obj.default == true)
    for (const status of allStatuses) {
        if (item.hasTag(status.tag)) statusObj = status
    }
    return statusObj;
}

// Get the all status from item
export function getItemStatusAll(item: Zotero.Item) {
    let statusObj = allStatuses.find(obj => obj.default == true)
    for (const status of allStatuses) {
        if (item.hasTag(status.tag)) statusObj = status
    }
    return statusObj;
}

// Get the all status from item
export function getAllReasonsFromItems(tags: any[]) {
    return tags.filter(obj => {
        return obj.tag.includes(reasonTagPrefix)
    }).map(obj => {
        const label = obj.tag.replace(reasonTagPrefix, "")
        return {label: label, value: label}
    })
}

// Get the status from a tag name
export function getStatusFromTag(tag: string) {
    const status = allStatuses.find(obj => obj.tag == tag)
    return status;
}

// Remove all statuses from item
export function removeAllStatuses(item: Zotero.Item) {
    // Remove all status tags
    // for (const status of allStatuses) {
    //     item.removeTag(status.tag);
    // }

    // Remove the exclusion criteria
    item.getTags().map((tag) => {
        if (tag.tag.includes(statusTagPrefix)) item.removeTag(tag.tag);
    });
}

export function generateMenuIcon(color: string) {
    return "data:image/svg+xml;base64," + window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="12" r="12" /></svg>`)
}
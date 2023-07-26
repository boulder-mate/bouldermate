import {ID, Time} from "common"
import { ObjectId } from "mongodb"

export function newId(): ID {
    return {_id: new ObjectId()}
}

export function newTime(): Time {
    return {
        created: new Date().toISOString(),
        last_updated: new Date().toISOString(),
    }
}
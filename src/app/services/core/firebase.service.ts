import { Injectable } from "@angular/core";
import { Database, ref, get } from '@angular/fire/database';


@Injectable({
    providedIn: 'root'
})

export class FirebaseService {
    public REF_URL = this.database+ `FISH-TANK`;

    constructor(
        private database: Database
    ) { };

    /**FIREBASE
     * getAllLogs()
     * getLogsArr()
     * getLogsByDept()
     */


    async getAllLogs() {
        const snapshot = await get(ref(this.database, `FISH-TANK/logs`));
        return snapshot.val();
    }

    async getStatus() {
        const snapshot = await get(ref(this.database, `FISH-TANK/status`));
        return snapshot.val();
    }


}
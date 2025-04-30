import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
// get -> recieve
// post -> add/edit
// del -> remove



export class ManipulateDataService{
    
    constructor(
        
    ){};

    calculateOccupiedDurationPerDayInMinutes(data: any): number {
        const entries = Object.values(data); // Get all the objects
        let totalDuration = 0;
        let occupiedStart: Date | null = null;
      
        for (let i = 0; i < entries.length; i++) {
          const current:any = entries[i];
          const next = entries[i + 1]; // Lookahead for next entry
      
          if (current.status === "Occupied") {
            // If it's the first "Occupied" or consecutive "Occupied", set the start time
            if (!occupiedStart) {
              occupiedStart = new Date(current.dateTime);
            }
          }
      
          if (current.status === "Vacant") {
            // If "Vacant" and we have an "Occupied" start, calculate the duration
            if (occupiedStart) {
              const vacantTime = new Date(current.dateTime);
              totalDuration += vacantTime.getTime() - occupiedStart.getTime();
              occupiedStart = null; // Reset after adding duration
            }
          }
        }
      
        // Convert total duration to seconds (optional: can convert to minutes/hours if needed)
        return totalDuration / (1000*60);
      }



}
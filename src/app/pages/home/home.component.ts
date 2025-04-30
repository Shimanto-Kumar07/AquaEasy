import { Component, HostListener, OnInit } from "@angular/core";
import { FirebaseService } from "../../services/core/firebase.service";
import { Database, ref, set } from "@angular/fire/database";
 
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
}) 
export class HomeComponent implements OnInit {
  currentPage = "dashboard";
  temperature = "25.5°C";
  sidebarActive = false;
  public automate:Boolean;
  public logs: any;
  public status: any;

  constructor(private firebaseService: FirebaseService, private db: Database) {}

  showPage(pageId: string): void {
    this.currentPage = pageId;
    if (window.innerWidth <= 1200) {
      this.sidebarActive = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    if (window.innerWidth > 1200) {
      this.sidebarActive = false;
    }
  }

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent): void {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");

    if (
      window.innerWidth <= 1200 &&
      sidebar &&
      !sidebar.contains(event.target as Node) &&
      menuToggle &&
      !menuToggle.contains(event.target as Node) &&
      this.sidebarActive
    ) {
      this.sidebarActive = false;
    }
  }


  public toggleAutomate(event: Event) {
    this.automate = !this.automate;
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked){
      const ledRef = ref(this.db, "FISH-TANK/status/servo");
      // console.log(ledRef);
      
      set(ledRef, "auto")
        .then(() => console.log("LED status updated"))
        .catch((error) => console.error("Error updating LED:", error));
    }else if (!isChecked){
      const ledRef = ref(this.db, "FISH-TANK/status/servo");
      set(ledRef, "idle")
        .then(() => console.log("LED status updated"))
        .catch((error) => console.error("Error updating LED:", error));
    }

  }

  public toggleMainLight(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.status.led = isChecked;

    const ledRef = ref(this.db, "FISH-TANK/status/led");
    set(ledRef, isChecked)
      .then(() => console.log("LED status updated"))
      .catch((error) => console.error("Error updating LED:", error));
  }

  public togglePump(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.status.pump = isChecked;

    const ledRef = ref(this.db, "FISH-TANK/status/pump");
    set(ledRef, isChecked)
      .then(() => console.log("Pump status updated"))
      .catch((error) => console.error("Error updating LED:", error));
  }

  public feedNow(): void {
    // In a real app, you would call a service here
    console.log("Fish fed at", new Date().toLocaleTimeString());

    const ledRef = ref(this.db, "FISH-TANK/status/servo");
    set(ledRef, "activate")
      .then(() => {
        this.getStatus();
        console.log("LED status updated");
      })
      .catch((error) => console.error("Error updating LED:", error));
  }

  ngOnInit(): void {
    // Simulate temperature changes
    this.getAllLogs();
    this.getStatus();

    setInterval(() => {
      this.getStatus();
    }, 5000);
  }

  private getAllLogs() {
    this.firebaseService.getAllLogs().then((res: any) => {
      this.logs = res;
      console.log("logs", res);
    });
  }

  private getStatus() {
    this.firebaseService.getStatus().then((res: any) => {
      this.status = res;
      if (this.status.servo === "auto") {
        this.automate = true;
      } else {
        this.automate = false;
      }
      // console.log(this.automate);
      
      console.log("status", res);
    });
  }
}

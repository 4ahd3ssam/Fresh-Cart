import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThememodeService {

  constructor() { }

  handleDark() {
    localStorage["theme"] = "dark";
  }

  handleLight() {
    localStorage["theme"] = "light";
  }
  updateLocalStorage() {
    if (this.isDarkMode()) {
      this.handleLight();
    }
    else {
      this.handleDark();
    }
  }
  isDarkMode() {
    if (localStorage["theme"] === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      return true;
    }
    return false
  }

  updateHTMLMode() {
    console.log("toggling")
    document.documentElement.classList.toggle("dark", this.isDarkMode());
  }

}

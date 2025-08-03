import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(ID)) {
  if(localStorage.getItem("token") !== null) {
    return true;
  }
  else {
    router.navigate(["/login"]);
    return false;
  }
  }
  else {
    return false;
  }

};

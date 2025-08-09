import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly toastr: ToastrService) { }

  sendSuccess(msg: string) {
    this.toastr.success(msg, "FreshCart", {
      progressBar: true,
      positionClass: 'toast-bottom-right'
    })
  }

    sendError(msg: string) {
    this.toastr.error(msg, "FreshCart", {
      progressBar: true,
      positionClass: 'toast-bottom-right'
    })
  }
}

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'push-test';

  #destroy = inject(DestroyRef);
  #swPush = inject(SwPush);
  #swUpdate = inject(SwUpdate);

  public ngOnInit(): void {
    this.#checkNewVersion();
    this.#subscribeToPush();
  }

  #checkNewVersion(): void {
    if (this.#swUpdate.isEnabled) {
      this.#swUpdate.checkForUpdate().then((available) => {
        if (available && confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
  #subscribeToPush(): void {
    this.#swPush.messages
      .pipe(takeUntilDestroyed(this.#destroy))
      .subscribe((res: any) => {
        console.log(res, ' Notification message');
      });
  }
}

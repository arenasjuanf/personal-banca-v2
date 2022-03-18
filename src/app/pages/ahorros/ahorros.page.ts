import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-ahorros',
  templateUrl: './ahorros.page.html',
  styleUrls: ['./ahorros.page.scss'],
})
export class AhorrosPage implements OnInit {
  public list: any[];
  public headerOptions: { endIcon: string; endFunction: () => void};

  constructor(
    private ahorros: AhorrosService,
    private modalCtrol: ModalController,
    private routerOutlet: IonRouterOutlet,
    public platform: Platform
  ) {
    this.initHeaderOptions();
    this.getAhorros();
  }

  ngOnInit() {
  }

  async getAhorros(){
    (await this.ahorros.getAll(1)).subscribe((list: any) => {
      this.list = list;
    });
  }

  initHeaderOptions(){
    this.headerOptions = {
      endIcon: 'add',
      endFunction : () => this.openModal()
    };
  }

  async openModal(){
   const modal = await this.modalCtrol.create(
      {
        animated: true,
        mode: 'md',
        component: FormComponent,
        swipeToClose: false,
        // cssClass: this.platform.platforms().includes('desktop') ? 'modal-desktop' : '',
        presentingElement: this.routerOutlet.nativeEl
      }
    );
    return await modal.present();
  }

}
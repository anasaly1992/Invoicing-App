import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { InvoicesService } from './invoices/services/invoices.services';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, CommonModule, MenubarModule, DropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'invoicing-app';
  items!: MenuItem[];
  cities: any;
  userSelected:string = ''

  selectedCity: any;
  constructor(private router: Router, private invoicesService: InvoicesService){

  }
  ngOnInit(): void {
    sessionStorage.setItem("role", 'Admin');
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  
this.setUsersList('Admin')
   
  }
  selectUser(userType: string){
    sessionStorage.setItem("role", userType);

    this.invoicesService.role.next(sessionStorage.getItem('role'))
    this.setUsersList(userType)
  }

  setUsersList(userType:string){
    this.items = [
      {
        label: 'Invoices',
        icon: 'pi pi-home',
        command: () => {
          this.navigateToInvoicesList();
      },
      },
      {
        label: userType,
        icon: 'pi pi-user',
        items: [
            {
                label: 'Admin',
                icon: 'pi pi-user',
                command: () => {
                  this.selectUser('Admin');
              },
              escape:true
            },
            {
                label: 'User',
                icon: 'pi pi-user',
                command: () => {
                  this.selectUser('User');
              }

            }
          ]
    },
    ]
  }

  navigateToInvoicesList(){
    this.router.navigate([''])
  }
}

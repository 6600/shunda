import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'test1',
    loadChildren: () => import('./test/test1/test1.module').then( m => m.Test1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./individual/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'myinfo',
    loadChildren: () => import('./individual/myinfo/myinfo.module').then( m => m.MyinfoPageModule)
  },
  {
    path: 'myaccessory',
    loadChildren: () => import('./individual/myaccessory/myaccessory.module').then( m => m.MyaccessoryPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'quweixiu',
    loadChildren: () => import('./weixiu1/quweixiu/quweixiu.module').then( m => m.QuweixiuPageModule)
  },
  {
    path: 'weixiuzhong',
    loadChildren: () => import('./weixiu1/weixiuzhong/weixiuzhong.module').then( m => m.WeixiuzhongPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./home/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'mydevices',
    loadChildren: () => import('./individual/mydevices/mydevices.module').then( m => m.MydevicesPageModule)
  },
  {
    path: 'devstatus',
    loadChildren: () => import('./individual/mydevices/devstatus/devstatus.module').then( m => m.DevstatusPageModule)
  },
  {
    path: 'myfactory',
    loadChildren: () => import('./individual/myfactory/myfactory.module').then( m => m.MyfactoryPageModule)
  },
  {
    path: 'langan-scan',
    loadChildren: () => import('./langan-scan/langan-scan.module').then( m => m.LanganScanPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'langan-add',
    loadChildren: () => import('./langan-add/langan-add.module').then( m => m.LanganAddPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'langan-info',
    loadChildren: () => import('./langan-info/langan-info.module').then( m => m.LanganInfoPageModule)
  },
  {
    path: 'maintainrecord',
    loadChildren: () => import('./weixiu1/maintainrecord/maintainrecord.module').then( m => m.MaintainrecordPageModule)
  },
  {
    path: 'maintainlist',
    loadChildren: () => import('./weixiu1/maintainlist/maintainlist.module').then( m => m.MaintainlistPageModule)
  },
  {
    path: 'maintainlist1',
    loadChildren: () => import('./weixiu1/maintainlist1/maintainlist1.module').then( m => m.Maintainlist1PageModule)
  },
  {
    path: 'factoryinfo',
    loadChildren: () => import('./factoryinfo/factoryinfo.module').then( m => m.FactoryinfoPageModule)
  },
  {
    path: 'msginfo',
    loadChildren: () => import('./msginfo/msginfo.module').then( m => m.MsginfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

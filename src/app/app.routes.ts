import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'ui',
		loadChildren: () => import('./inbody.module').then(m => m.InbodyModule)
	}
];

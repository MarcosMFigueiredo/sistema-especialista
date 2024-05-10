import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { DadosPCService } from './core/services/data.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    QuestionsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [DadosPCService],
  bootstrap: [AppComponent, ]
})
export class AppModule { }

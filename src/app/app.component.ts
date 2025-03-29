import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { AppService } from './app.service';

interface UserInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task3';
  arr = ['apple', 'banana', 'mango'];
  obj = { name: 'mark', age: 20 };
  currentdate: Date = new Date();
  
  posts: any; // Replace `any` with proper type
  private subs: Subscription;

  arr2 = [
    { name: 'Mark', age: 20 },
    { name: 'Emad', age: 20 },
    { name: 'Daniel', age: 20 }
  ];
  
  arr$ = of(this.arr2);
  users$ = new BehaviorSubject<UserInterface[]>([]);
  subject$ = new Subject<UserInterface[]>(); // Declared before use

  constructor(private appservice: AppService) {}

  ngOnInit(): void {
    let x = 'ail';
    console.log(x);
    x = 'nai';

    // Avoid nested subscriptions (use operators like `combineLatest` instead)
    this.subs = this.users$.subscribe(users => {
      console.log("BehaviorSubject", users);
    });

    const subjectSub = this.subject$.subscribe(users => {
      console.log('subject', users);
    });
    this.subs.add(subjectSub); // Combine subscriptions for cleanup

    setTimeout(() => {
      this.users$.next([
        { id: '1', name: 'Mark' },
        { id: '2', name: 'Emad' }
      ]);

      this.subject$.next([
        { id: '3', name: 'Daniel' },
        { id: '4', name: 'Emad' }
      ]);

      console.log('setTime', this.users$.getValue());
      console.log('setTimeSubject', this.subject$);
    }, 5000);

    this.getposts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // Clean up subscriptions
  }

  getposts() {
    this.posts = this.appservice.getposts();
    // Uncomment and fix if needed:
    // .pipe(
    //   tap(res => console.log('tap', res)),
    //   map(res => res),
    //   catchError(err => of(err))
    // ).subscribe(res => console.log(res));
  }
}
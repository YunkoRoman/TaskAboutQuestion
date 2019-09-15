import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {element} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerVars = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;
  public visio: any = {};
  public showBtn: boolean = false;
  public showVideoBox: boolean = false;
  public answer1: any;
  public answer2: any;
  public answer3: any;
  public listenQuestion: any = [
    {
      id: 1,
      name: 'Питання 1',
      right: 3
    },
    {
      id: 2,
      name: 'Питання 2',
      right: 2
    },
    {
      id: 3,
      name: 'Питання 3',
      right: 4
    }];
  public _questions: any = [
    {
      id: 1,
      right: 3,
      description: 'Питання 1.Якого періоду це авто',
      path: [
        {photo: "https://autowise.com/wp-content/uploads/2018/06/1970-Chevelle-SS454-e1552294336396.jpg"}
      ],

      listOfAnswers: [
        {
          id: 1,
          answer: 1980,
          right: false
        },
        {
          id: 2,
          answer: 1990,
          right: false
        },
        {
          id: 3,
          answer: 1960,
          right: true
        },
        {
          id: 4,
          answer: 1970,
          right: false
        },
      ]
    },
    {
      id: 2,
      description: 'Питання 2 .На якому фото зображений Plymouth Road Runner',
      right: 2,
      listOfAnswers: [
        {
          id: 1,
          answer: 1,
          right: false
        },
        {
          id: 2,
          answer: 2,
          right: false
        },
        {
          id: 3,
          answer: 3,
          right: true
        },
        {
          id: 4,
          answer: 4,
          right: false
        },
      ],
      path: [
        {photo: 'https://i.pinimg.com/originals/bc/62/df/bc62df65d8b1ef89533afa9c15a426af.jpg'},
        {photo: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBSEjNn.img?h=416&w=624&m=6&q=60&u=t&o=f&l=f&x=1112&y=673'},
        {photo: 'data:image/jpeg;base64,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'},
        {photo: 'https://cdn.carbuzz.com/gallery-images/original/373000/700/373754.jpg'}
      ]
    },
    {
      id: 3,
      right: 2,
      listOfAnswers: [
        {
          id: 1,
          answer: 1,
          right: false
        },
        {
          id: 2,
          answer: 2,
          right: false
        },
        {
          id: 3,
          answer: 3,
          right: true
        },
        {
          id: 4,
          answer: 4,
          right: false
        },
      ],
      path: [
        {video: 'MF2GsvelF7c'}
      ],
      description: 'Питання 3'
    }
  ];


  constructor() {
  }
//Приймає id питання і показує вміст
  showQuestion(id: number) {
    this._questions.forEach((a) => {
      if (a.id === id) {
        this.visio.id = a.id;
        this.visio.path = a.path;
        this.visio.description = a.description;
        this.visio.listOfAnswers = a.listOfAnswers;
        this.visio.right = a.right;
        this.showBtn = true;
        this.visio.path.forEach(e => {
          if (e.video) {
            this.showVideoBox = true
          } else {
            this.showVideoBox = false
          }
        })
      }
    })
  }
//Кнопка перевірки на правельність відповіді
  sendAnswer(AnswerForm: NgForm) {
    AnswerForm.value.answer.forEach(a => {
      if (a.id === 1) this.answer1 = a.answer;
      if (a.id === 2) this.answer2 = a.answer;
      if (a.id === 3) this.answer3 = a.answer;
      if (a.right === true) alert('Це правильна відповідь');
      if (a.right === false) alert(`Це не правильна відповідь, правильна відповідь під номером ${a.rightAnswer} `)
    });

  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }

  savePlayer(player) {
    this.player = player;
  }
// Кнопка переходу на інше питання
  NextQuetion(id: number) {
    if (id >= 3) {
      id = 0
    }
    this._questions.forEach((a) => {
      if (a.id === id + 1) {
        this.visio.id = a.id;
        this.visio.path = a.path;
        this.visio.description = a.description;
        this.visio.listOfAnswers = a.listOfAnswers;
        this.showBtn = true;
        this.visio.path.forEach(e => {
          if (e.video) {
            this.showVideoBox = true
          } else {
            this.showVideoBox = false
          }
        })
      }
    })
  }



}

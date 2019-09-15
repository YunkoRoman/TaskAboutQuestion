import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private player;
  private ytEvent;
  public visio: any = {};
  public showBtn: boolean = false;
  public showVideoBox: boolean = false;
  public answer1: boolean = true ;
  public answer2: boolean = false;
  public _questions: any = [
    {
      id: 1,
      name: 'Питання 1',
      right: undefined,
      rightQuestion: 3,
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
      name: 'Питання 2',
      right: undefined,
      description: 'Питання 2 .На якому фото зображений Plymouth Road Runner',
      rightQuestion: 2,
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
        {photo:'https://dealerslink.s3.amazonaws.com/vehicles/939/P3619-8B25DBF4A0D3C1018B19ACC7FAB4B83E.jpg'},
        {photo: 'https://cdn.carbuzz.com/gallery-images/original/373000/700/373754.jpg'}
      ]
    },
    {
      id: 3,
      name: 'Питання 3',
      right: undefined,
      rightQuestion: 3,
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
        this.visio.rightQuestion = a.rightQuestion;
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
      if (a.right === true) alert('Це правильна відповідь');
      if (a.right === false) alert(`Це не правильна відповідь, правильна відповідь під номером ${a.rightAnswer} `);
      //Зміна кольору кнопки відповідно чи дана відповідь правильно
      if (a.right === true) {
        this.changeDesc(a.id, true)
      }
      if (a.right === false) {
        this.changeDesc(a.id, false)
      }
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
  //функція яка змінює значення в об'єкті
  changeDesc( value, desc ) {
    for (let i in this._questions) {
      if (this._questions[i].id == value) {
        this._questions[i].right = desc;
        console.log(this._questions[i].right = desc);
        break; //Stop this loop, we found it!
      }
    }
  }


}

import React from 'react';
import {connect} from 'react-redux';
import {USER_DETAIL} from '../../action/actionConstants';
import {Link} from 'react-router';
import {checkEmail} from "../../helperFunction/validationCheck";

import './homepage.scss';




const letterMap = ["A", "B", "C", "D", "E", "F", "G", "H" , "I", "J", ];




function makeSeatNumber(row, col){
  return (letterMap[row]+col).toString();

}


class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = { userDetail : {name : "", seatCount : ""}
    , seatDs : [ [ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]
                ,[ false, false, false , false , false , false , false , false , false, false, false, false]]

      , users : []
      , active : false
      , localSelectedSeat : []

    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange(type, e){
    let val = e.target.value;
    const {userDetail} = this.state;

    let newUserDetails = {...userDetail};
    newUserDetails[type] = val;
    this.setState({userDetail : newUserDetails });
  }

  onSelect(row, col){
    const {userDetail , seatDs, users, localSelectedSeat } = this.state;

    let newseats = [...seatDs];
    let localSeats = [...localSelectedSeat];


    let seatNumber = makeSeatNumber(row, col);
    let index = localSelectedSeat.indexOf(seatNumber);


    if(index === -1){
      if(userDetail.seatCount > localSelectedSeat.length) {
        newseats[row][col] = !seatDs[row][col];
        localSeats.push(seatNumber);
      }
    }else{
      newseats[row][col] = !seatDs[row][col];
      localSeats.splice(index, 1);
    }

    this.setState({seatDs : newseats,localSelectedSeat : localSeats});
  }



  onSubmit(){
    const {userDetail} = this.state;
    const {name , seatCount} = userDetail;
    if(name && seatCount){
      this.setState({active : true });
    }
  }

  onConfirm(){
    const {userDetail , users, localSelectedSeat } = this.state;
    let newUsers= [...users];
    newUsers.push({name : userDetail.name, seats : localSelectedSeat });
    this.setState({users : newUsers, userDetail : {name : "", seatCount : ""}, active : false, localSelectedSeat : []});
  }

  render () {

    const {userDetail, seatDs, users, active, localSelectedSeat} = this.state;
    const {name , seatCount} = userDetail;

    let proceedDisabled = false;
    let seatInfoArray = [];

    if(!name || !seatCount){
      proceedDisabled = true;
    }

    let seatsArray = seatDs.map((seatRow, i) => {

         let seatRowFlex = seatRow.map((item, j) => {

           let style = item ? "seat-style-selected seat-style-default": "seat-style-default";
           let lst = checkIfSeatReserved(i,j, users) ? "seat-style-default seat-style-reserved" : style;

           return (
             <span className={lst}   onClick={this.onSelect.bind(this, i, j)}/>
           )
         });

       return (
         <div className="seat-row">
           <span className="seat-style-label">{letterMap[i]}</span>
           {seatRowFlex}
         </div>
       )

    });


     if(users.length > 0) {
       seatInfoArray = users.map((item) => {

         return (
           <div>
             <span className="label-1 bold">{item.name}</span>
             <span className="label-2 bold">{item.seats.length}</span>
             <span className="label-3 bold">{item.seats.join(", ")}</span>
           </div>
         )


       });
     }





    return (
      <div className="container">

        <div className="max-1200 pad_top welcome_screen">

        <h3 className="text-center"> MOVIE SEAT RESERVATION </h3>

          <div className="user-info-flex">

            <div className="user-items-1">
              <span>Name</span>
              <input type="text" value={name} onChange={this.onChange.bind(this, "name")}/>
            </div>

            <div className="user-items-2">
              <span>Number of seats</span>
              <input type="number" value={seatCount} onChange={this.onChange.bind(this, "seatCount")}/>
            </div>
            <button className={proceedDisabled ? "buttonDefault buttonDefault-disabled" : "buttonDefault"} onClick={this.onSubmit}>Start Selecting</button>
          </div>

          <div className="screen-style">
            Screen
          </div>


          <div className={active ? "ticket-selection-screen" : "ticket-selection-screen disabled"}>
            <div className="seat-row">
              <span className="seat-style-label">  </span>
              <span className="seat-style-label"> 1 </span>
              <span className="seat-style-label"> 2 </span>
              <span className="seat-style-label"> 3 </span>
              <span className="seat-style-label"> 4 </span>
              <span className="seat-style-label"> 5 </span>
              <span className="seat-style-label"> 6 </span>
              <span className="seat-style-label"> 7 </span>
              <span className="seat-style-label"> 8 </span>
              <span className="seat-style-label"> 9 </span>
              <span className="seat-style-label"> 10 </span>
              <span className="seat-style-label"> 11 </span>
              <span className="seat-style-label"> 12 </span>
            </div>
            {seatsArray}

          </div>
          <button className={localSelectedSeat.length > 0 ? "buttonDefaultSubmit" : "buttonDefaultSubmit  buttonDefault-disabled"}
                  onClick={this.onConfirm}>Confirm Selection</button>




          <div className="ticket-table">
            <div>
              <span className="label-1 bottomBorder">Name</span>
              <span className="label-2 bottomBorder">No. of seats</span>
              <span className="label-3 bottomBorder">Seats</span>
            </div>

            {seatInfoArray}

          </div>


        </div>

      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    userDetail : state.UserDetail

  };
}

export default connect(mapStateToProps)(Main);




function checkIfSeatReserved(row, col, users){
  let seatNumber = makeSeatNumber(row, col);
  let isReserved = false;

  users.forEach(item => {

    if(item.seats.indexOf(seatNumber) !== -1){
      isReserved = true;
    }

  });

  return isReserved;


}

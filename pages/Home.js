import React from "react";
import M from "../components/materialize-v1.0.0-mod/js/materialize.js";

function Home({ user }) {
  const timers = document.querySelectorAll('.timepicker');
    for(let timer=0; timer<timers.length; timer++){
        M.Timepicker.init(timers[timer], {
            twelveHour: false,
            showClearBtn:"true",
            i18n:{
                clear:"remove",
                cancel:"No",
                done:"Yes",
            }
        }
        );
    }
  return (
    <div>
      <input type="text" className="timepicker form-control"></input>
      <h2>Welcome, {user.username}!</h2>
      <p>You are logged in.</p>
    </div>
  );
}

export default Home;
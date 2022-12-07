import LocalAPI from './Calendar/API'
import React from "react";


let api = new LocalAPI()

class App extends React.Component {
    user = api.loadUser('tom')

    render() {
        console.log(this.user.fitnessCalendar.getCurrentWeight())
        this.user.fitnessCalendar.logWeight(176);
        api.saveUser(this.user);
        return (
            <>
                { this.user.getUsername() }
            </>
        )
    }
}

export default App;

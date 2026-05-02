import React from 'react';
import './static/style/animations.css';
import './static/style/global-improvements.css';
import Mainphoto from "./components/mainphoto";
import VisitorsText from "./components/visitors_text";
import PlaceOfMeeting from "./components/place_of_meeting";
import Timing from "./components/timing";
import Dress from "./components/dress_code";
import Timer from "./components/timer";
import Questions from "./components/quastions";

function App() {

    return (
        <main>
            <Mainphoto></Mainphoto>
            <VisitorsText></VisitorsText>
            <PlaceOfMeeting></PlaceOfMeeting>
            <Timing></Timing>
            <Dress></Dress>
            <Timer></Timer>
            <Questions></Questions>
        </main>
    );
}

export default App;

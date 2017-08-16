import * as firebase from "firebase";

export const addMarker = (marker) => ({
    type: 'ADD_MARKER',
    ...marker
});

export const startFetchingMarkers = () => ({
    type: 'START_FETCHING_MARKERS',
});

export const receivedMarkers = () => ({
    type: 'RECEIVED_MARKERS',
    receivedAt: Data.now()
})


export const fetchMarkers = () => {
    return function (dispatch) {
        dispatch(startFetchingMarkers());

        firebase.database()
            .ref('markers')
            .on('value', (snapshot) => {
                // get around Redux panicking about actions in reducers
                setTimeout(() => {
                    const markers = snapshot.val() || [];

                    dispatch(receiveMarkers(markers))
                }, 0);
            });
    }
}


export const receiveMarkers = (markers) => {
    return function (dispatch) {
        Object.values(markers).forEach( marker => dispatch(addMarker(marker)));

        dispatch(receivedMarkers());
    }
}
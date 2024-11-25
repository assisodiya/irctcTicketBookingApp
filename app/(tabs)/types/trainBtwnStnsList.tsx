export interface TrainBetweenStationsList {
    trainNumber: string;
    trainName: string;
    fromStnCode: string;
    toStnCode: string;
    arrivalTime: string;
    departureTime: string;
    distance: string;
    duration: string;
    runningMon: string;
    runningTue: string;
    runningWed: string;
    runningThu: string;
    runningFri: string;
    runningSat: string;
    runningSun: string;
    avlClasses: string[];
    trainType: string[];
    atasOpted: string;
    flexiFlag: string;
    trainOwner: string;
    trainsiteId: string;
    trainRoute: TrainRoute;
    foodChoiceEnabled?: string | null;
}

interface TrainRoute {
    _id: string;
    trainNumber: string;
    trainName: string;
    stationFrom: string;
    stationTo: string;
    trainOwner: string;
    trainRunsOnMon: string;
    trainRunsOnTue: string;
    trainRunsOnWed: string;
    trainRunsOnThu: string;
    trainRunsOnFri: string;
    trainRunsOnSat: string;
    trainRunsOnSun: string;
    timeStamp: string;
    stationList: Station[];
    __v: number;
}

interface Station {
    stationCode: string;
    stationName: string;
    arrivalTime: string;
    departureTime: string;
    routeNumber: string;
    haltTime: string;
    distance: number;
    dayCount: number;
    stnSerialNumber: number;
    boardingDisabled: string;
    previousDistance: number;
    previousDuration: string;
    _id: string;
}


import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { GetTrainListService } from "./trainservice";
import { TrainBetweenStationsList } from "./types/trainBtwnStnsList";
import { bootstrapColors } from "../styles/color-code";
import SkeletonLoader from "../utils/loader-skelton";
import { Duration } from "luxon";


const quotas = ["General", "Tatkal", "Senior Citizen", "Ladies"];

const dates = [
    { day: "Sat", date: "23", status: "Few Seats", isSelected: true },
    { day: "Sun", date: "24", status: "Few Seats", isSelected: false },
    { day: "Mon", date: "25", status: "Filling Fast", isSelected: false },
    { day: "Tue", date: "26", status: "Filling Fast", isSelected: false },
    { day: "Wed", date: "27", status: "Few Seats", isSelected: false },
    { day: "Thu", date: "28", status: "Filling Fast", isSelected: false },
];

const TrainListScreen = () => {
    const [trainBtwnStnsList, setTrainBtwnStnsList] = useState<TrainBetweenStationsList[]>()
    const [selectedDate, setSelectedDate] = useState<string>("23");
    const [quotaList, setQuotaList] = useState<string[]>([]);
    const [selectedClassQuota, setSelectedClassQuota] = useState<any>({});
    const [availabilityList, setAvailabilityList] = useState<any>([]);
    const [quotaloading, setQuotaloading] = useState<boolean>(false)
    const params = useLocalSearchParams();
    const { fromStation, toStation, date } = params;

    React.useEffect(() => {
        if (fromStation && toStation && date) {

            GetTrainList()
        }
    }, [fromStation, toStation, date])

    const GetTrainList = async () => {
        try {
            const response = await GetTrainListService(fromStation, toStation, date)
            if (response) {
                setTrainBtwnStnsList(response.trainBtwnStnsList)
                setQuotaList(response.quotaList)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleClassClick = (trainNumber: string, className: string) => {
        setAvailabilityList([])
        setSelectedClassQuota((prevState: any) => ({
            [trainNumber]: {
                selectedClass: prevState[trainNumber]?.selectedClass === className ? null : className,
                selectedQuota: null, // Reset quota when class changes
            },
        }));
    }


    const handleDatePress = (date: string) => {
        setSelectedDate(date);
    };

    const handleQuotaClick = (trainNumber: string, quota: string) => {
        setQuotaloading(true); // Start loading
        setSelectedClassQuota((prevState: any) => ({
            [trainNumber]: {
                ...prevState[trainNumber],
                selectedQuota: prevState[trainNumber]?.selectedQuota === quota ? null : quota,
            },
        }));

        setTimeout(() => {
            // Simulate fetching availability for the selected quota
            setAvailabilityList([
                { date: "23 Nov", status: "Available", chance: 60, price: 365 },
                { date: "24 Nov", status: "Waitlist", chance: 44, price: 365 },
                { date: "25 Nov", status: "Waitlist", chance: 56, price: 365 },
            ]);
            setQuotaloading(false); // Stop loading
        }, 2000);
    };


    const DurationCalc = (durationString: string) => {
        const [hours, minutes] = durationString.split(":");
        const duration = Duration.fromObject({
            hours: parseInt(hours),
            minutes: parseInt(minutes),
        });

        return `${String(duration.hours).padStart(2, '0')}h:${String(duration.minutes).padStart(2, '0')}m`;
    }

    const HandleRouteClick = (route: any) => {

    }

    const renderTrain = ({ item }: { item: TrainBetweenStationsList }) => (
        <View style={styles.trainCard}>
            {/* Train Header */}
            <View style={styles.trainHeader}>
                <Text style={styles.trainName}>{item.trainName} ({item.trainNumber})</Text>
                <Text
                    onPress={() => HandleRouteClick(item.trainRoute)}
                    style={styles.rating}>
                    {/* <Ionicons name="star" size={14} color="green" /> {'A'} */}
                    <FontAwesome5 name="route" size={20} color="green" />
                </Text>
            </View>

            {/* Train Timing */}
            <View style={styles.trainTiming}>
                <Text style={styles.departure}>{item.departureTime}</Text>
                <Text style={styles.duration}>&#8592; {DurationCalc(item.duration)} &#8594;</Text>
                <Text style={styles.arrival}>{item.arrivalTime}</Text>
            </View>
            <View style={styles.trainTiming}>
                <Text style={styles.fromStnCode}>{item.fromStnCode}</Text>
                <Text style={styles.duration}>{'-'}</Text>
                <Text style={styles.toStnCode}>{item.toStnCode}</Text>
            </View>

            {/* Train Classes */}
            <View style={styles.container}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {/* Class Tabs */}
                    <View style={styles.trainClasses}>
                        {item.avlClasses.map((cls, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.classCard,
                                    selectedClassQuota[item.trainNumber]?.selectedClass === cls
                                        ? styles.classCardSelected
                                        : null,
                                ]}
                                onPress={() => handleClassClick(item.trainNumber, cls)}
                            >
                                <Text style={styles.className}>{cls}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* Render Quotas for Active Class */}
                {selectedClassQuota[item.trainNumber]?.selectedClass && (
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.quotaContainer}>
                                {quotaList.map((quota) => (
                                    <TouchableOpacity
                                        key={quota}
                                        style={[
                                            styles.quotaTab,
                                            selectedClassQuota[item.trainNumber]?.selectedQuota === quota
                                                ? styles.quotaTabSelected
                                                : null,
                                        ]}
                                        onPress={() => handleQuotaClick(item.trainNumber, quota)}
                                    >
                                        <Text style={styles.quotaTabText}>{quota}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Availability Details */}
                        {selectedClassQuota[item.trainNumber]?.selectedQuota && quotaloading ? (
                            <SkeletonLoader /> // Show skeleton loader while fetching data
                        ) : (
                            <View style={styles.availability}>
                                {availabilityList.map((availability: any, index: number) => (
                                    <View key={index} style={styles.availabilityRow}>
                                        <Text style={styles.availabilityDate}>{availability.date}</Text>
                                        <Text style={styles.availabilityStatus}>
                                            {availability.status} ({availability.chance}%)
                                        </Text>
                                        <TouchableOpacity style={styles.bookButton}>
                                            <Text style={styles.bookButtonText}>
                                                Book ₹{availability.price}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            {/* Scrollable Dates */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateScrollContainer}
            >
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dateItem,
                            selectedDate === date.date && styles.dateItemSelected,
                        ]}
                        onPress={() => handleDatePress(date.date)}
                    >
                        <View style={styles.dateAndDay}>
                            <Text
                                style={[
                                    styles.dateDay,
                                    selectedDate === date.date && styles.dateDaySelected,
                                ]}
                            >
                                {date.day} {','}
                            </Text>
                            <Text
                                style={[
                                    styles.dateNumber,
                                    selectedDate === date.date && styles.dateNumberSelected,
                                ]}
                            >
                                {date.date}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.dateStatus,
                                selectedDate === date.date && styles.dateStatusSelected,
                            ]}
                        >
                            {date.status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                data={trainBtwnStnsList}
                keyExtractor={(item) => item.trainNumber}
                renderItem={renderTrain}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#f4f4f4",
        padding: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    trainCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    trainHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    trainName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    rating: {
        fontSize: 14,
        color: "green",
    },
    trainTiming: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    departure: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    duration: {
        fontSize: 12,
        color: "#999",
    },
    arrival: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    toStnCode: {
        color: bootstrapColors.danger
    },
    fromStnCode: {
        color: bootstrapColors.primary
    },

    trainClasses: {
        flexDirection: "row",
        marginBottom: 10,
    },
    classCard: {
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        justifyContent: "center",
    },
    classCardSelected: {
        backgroundColor: "#e0ffe0",
        borderColor: "green",
        borderWidth: 1,
    },
    className: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
    },
    classPrice: {
        fontSize: 12,
        color: "red",
        marginTop: 5,
    },
    classStatus: {
        fontSize: 10,
        color: "#999",
        marginTop: 5,
    },
    quotaContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    availability: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
    },
    availabilityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    quotaTab: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
        marginRight: 5,
    },
    quotaTabSelected: {
        backgroundColor: "#e0ffe0",
        borderColor: "green",
        borderWidth: 1,
    },
    quotaTabText: {
        fontSize: 14,
        color: "#333",
    },
    quotaTabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    quotaTabTextSelected: {
        color: "green",
        fontWeight: "bold",
    },
    availabilityDate: {
        fontSize: 14,
        color: "#555",
    },
    availabilityStatus: {
        fontSize: 12,
        color: "orange",
    },
    bookButton: {
        backgroundColor: "green",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },

    bookButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    dateStatusSelected: {
        color: "green",
    },
    dateItem: {
        alignItems: "center",
        padding: 10,
        marginRight: 15,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    dateItemSelected: {
        backgroundColor: "#e0ffe0",
        borderWidth: 1,
        borderColor: "green",
    },
    dateDay: {
        fontSize: 15,
        color: "#333",
    },
    dateDaySelected: {
        color: "green",
        fontWeight: "bold",
    },
    dateNumber: {
        fontSize: 15,
        color: "#333",
        fontWeight: "bold",
    },
    dateNumberSelected: {
        color: "green",
    },
    dateAndDay: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2
    },
    dateStatus: {
        fontSize: 12,
        color: "#999",
    },
    dateScrollContainer: {
        paddingVertical: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
});

export default TrainListScreen;

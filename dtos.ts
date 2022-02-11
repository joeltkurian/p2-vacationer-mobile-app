export interface Reservation {
    id: string,
    checkIn: number,
    checkOut: number,
    owner: string,
    room: string
}

export interface Activity {
    id: string,
    title: string,
    desc: string,
    startTime: number,
    endTime: number,
    location: string,
    status: "On Schedule" | "Cancelled"
}

export interface ServiceRequest {
    id: string,
    room: string,
    created: number,
    status: "Ordered" | "Processing" | "Completed" | "Cancelled",
    requestedOffering: Offering[]
}

export interface Offering {
    desc: string,
    cost: number
}

export interface Offerings{
    items:Offering[],
    quantities:number[]
}


export interface ProblemSubmission {
    desc: string,
    base64Photo?: string
}

export interface Problem {
    id: string,
    submittedTime: number,
    desc: string,
    status: "Unreviewed" | "Reviewed",
    photoLink?: string
}

interface LocationImage {
    location: "Nightclub" | "Contract Bar" | "Terrace" | "Gymnasium" | "Tools Vault" | "Grand Lobby" | "Balcony";
    photoLink: string
}

export const activityLocationBasedImages: LocationImage[] = [
    { location: "Balcony", photoLink: 'https://media-cdn.tripadvisor.com/media/photo-s/03/78/af/61/armani-hotel-dubai.jpg' },
    { location: "Contract Bar", photoLink: 'https://img2.10bestmedia.com/Images/Photos/369088/Sazerac-Bar_54_990x660.jpg' },
    { location: "Grand Lobby", photoLink: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Shanghai_Disneyland_Hotel_Grand_Lobby.jpg' },
    { location: "Gymnasium", photoLink: 'https://www.mensjournal.com/wp-content/uploads/2018/04/bxr_gym.jpg?quality=86&strip=all' },
    { location: "Nightclub", photoLink: 'https://i.pinimg.com/736x/bf/d8/1b/bfd81b0e207fedc0a098a3d5d9422f36.jpg' },
    { location: "Terrace", photoLink: 'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/03/radio-rooftop-bar-me-hotel-london-united-kingdom1.jpg?ssl=1' },
    { location: "Tools Vault", photoLink: 'https://images.squarespace-cdn.com/content/v1/52c9d908e4b0e87887310693/1569208568687-A3TA9NSBRZY1FCJDLMAE/Screenshot%2B2019-09-22%2B09.35.25.jpg?format=1000w' },
]
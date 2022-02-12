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
    status: "Ordered" | "Processing" | "Completed" | "Cancel",
    requestedOfferings: Offering[]
}

export interface Offering {
    desc: string,
    cost: number
}

export interface Offerings {
    items: Offering[],
    quantities: number[]
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
    location: "Nightclub" | "Contract Bar" | "Terrace" | "Gymnasium" | "Tools Vault" | "Grand Lobby" | "Balcony" | "Pool";
    photoLink: string
}

export interface ContinentalOffering {
    desc: "Tool Delivery" | "Attire Delivery" | "Clean-up Crew" | "Food Delivery" | "Guest Pickup";
    link: string;
}

const serviceCont = { toolDelivery: 'Lobster Bisque', clothDelivery: 'Crem Brule', cleanupCrew: 'Beef Wellington', foodDelivery: 'Hamburger', guestPickup: '' }

export function returnNewService(name: string): ContinentalOffering {
    if (name === serviceCont.toolDelivery)
        return { desc: "Tool Delivery", link: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/tool-delivery.jpg' };
    else if (name === serviceCont.clothDelivery)
        return { desc: "Attire Delivery", link: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/cloth-delivery.jpg' };
    else if (name === serviceCont.cleanupCrew)
        return { desc: "Clean-up Crew", link: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/clean-up-crew.png' };
    else if (name === serviceCont.foodDelivery)
        return { desc: "Food Delivery", link: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/food-delivery.jpg' };
    else (name === serviceCont.guestPickup)
    return { desc: "Guest Pickup", link: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/guest-pickup.jpg' };
}



export const activityLocationBasedImages: LocationImage[] = [
<<<<<<< HEAD
    { location: "Pool", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/pool.jpg' },
    { location: "Balcony", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/balcony.jpg' },
    { location: "Contract Bar", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/bar.jpg' },
    { location: "Grand Lobby", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/lobby.jpg' },
    { location: "Gymnasium", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/gym.jpg' },
    { location: "Nightclub", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/club.jpg' },
    { location: "Terrace", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/terrace.jpg' },
    { location: "Tools Vault", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/vault.jpg' },
]

export const pages = { Reservation: "Reservation Details", Activities: "Activities", Service: "Room Service", Complaints: "Report A Problem" };
=======
    { location: "Pool", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/pool.jpg'},
    { location: "Balcony", photoLink: 'https://media-cdn.tripadvisor.com/media/photo-s/03/78/af/61/armani-hotel-dubai.jpg' },
    { location: "Contract Bar", photoLink: 'https://img2.10bestmedia.com/Images/Photos/369088/Sazerac-Bar_54_990x660.jpg' },
    { location: "Grand Lobby", photoLink: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Shanghai_Disneyland_Hotel_Grand_Lobby.jpg' },
    { location: "Gymnasium", photoLink: 'https://www.mensjournal.com/wp-content/uploads/2018/04/bxr_gym.jpg?quality=86&strip=all' },
    { location: "Nightclub", photoLink: 'https://i.pinimg.com/736x/bf/d8/1b/bfd81b0e207fedc0a098a3d5d9422f36.jpg' },
    { location: "Terrace", photoLink: 'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/03/radio-rooftop-bar-me-hotel-london-united-kingdom1.jpg?ssl=1' },
    { location: "Tools Vault", photoLink: 'https://images.squarespace-cdn.com/content/v1/52c9d908e4b0e87887310693/1569208568687-A3TA9NSBRZY1FCJDLMAE/Screenshot%2B2019-09-22%2B09.35.25.jpg?format=1000w' },
]
>>>>>>> e075ef503dfe2b4e95607b8012e1d82164e6bf95

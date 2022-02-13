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
    { location: "Pool", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/pool.jpg' },
    { location: "Balcony", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/balcony.jpg' },
    { location: "Contract Bar", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/bar.jpg' },
    { location: "Grand Lobby", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/lobby.jpg' },
    { location: "Gymnasium", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/gym.jpg' },
    { location: "Nightclub", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/club.jpg' },
    { location: "Terrace", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/terrace.jpg' },
    { location: "Tools Vault", photoLink: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/vault.jpg' },
]

export const pages = { Reservation: "Reservation Details", Activities: "Activities", Service: "Room Service", Complaints: "Report A Problem", Kirbo: "Kirbo"};
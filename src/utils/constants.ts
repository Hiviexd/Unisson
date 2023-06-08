const states = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
];

const serviceTypes = [
    {
        name: "Photographe",
        value: "photographe",
    },
    {
        name: "Espace de fête",
        value: "salle",
    },
    {
        name: "Traiteur",
        value: "traiteur",
    },
    {
        name: "Band",
        value: "band",
    },
];

function getServiceName(serviceType: string) {
    switch (serviceType) {
        case "photographe":
            return "Photographe";
        case "salle":
            return "Espace de fête";
        case "traiteur":
            return "Traiteur";
        case "band":
            return "Band";
        default:
            return "Service";
    }
}

export default { states, serviceTypes, getServiceName };

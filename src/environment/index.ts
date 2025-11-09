export const environment = process.env.NODE_ENV as "development" | "production";

export const website = {
    Name: "Autoclicker",
    name: "autoclicker",
};

export const base_url =  {
    production: "https://www.theautoclicker.com/api",
    development: "http://localhost:8000/api"
};

export const base_url_server =  {
    production: "https://www.theautoclicker.com",
    development: "http://localhost:8000"
};
import {website} from 'environment'; 

export const unique_hostname = website.name

export const user_authentication = {
  name: `${unique_hostname}-user-key`,
  get() {
    const item = localStorage.getItem(this.name);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  },
  set(data: any) {
    if (typeof data === "string") {
      localStorage.setItem(this.name, data);
    } else {
      localStorage.setItem(this.name, JSON.stringify(data));
    }
  },
  remove(){
    localStorage.removeItem(this.name);
  },
};

export const theme = {
  name: `${unique_hostname}-theme`,
  get: () => JSON.parse(localStorage.getItem(`${unique_hostname}-theme`) as any),
  set: ({name, background}: {name: string, background: string}) => localStorage.setItem(`${unique_hostname}-theme`, JSON.stringify({name, background}))
};

export const border_color = {
  name: `${unique_hostname}-border-color`,
  get: () => localStorage.getItem(`${unique_hostname}-border-color`),
  set: (color: string) => localStorage.setItem(`${unique_hostname}-border-color`, color)
};

export const script_selected = {
  name: `${unique_hostname}-script-selected`,
  get: () => localStorage.getItem(`${unique_hostname}-script-selected`) as any,
  set: (id: string) => localStorage.setItem(`${unique_hostname}-script-selected`, id),
  remove: () => localStorage.removeItem(`${unique_hostname}-script-selected`)
};

export const script_recently = {
  name: `${unique_hostname}-script-recently`,
  get: () => {
    const key = `${unique_hostname}-script-recently`;
    const item = localStorage.getItem(key);
    if (!item) return [];
    try {
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },
  set: (id: string) => {
    const key = `${unique_hostname}-script-recently`;
    const item = localStorage.getItem(key);
    let items: string[] = [];
    if (item) {
      try {
        items = JSON.parse(item);
        if (!Array.isArray(items)) items = [];
      } catch {
        items = [];
      }
    }
    items = [id, ...items];
    items = Array.from(new Set(items));
    items = items.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(items));
    return items;
  },
  remove: () => localStorage.removeItem(`${unique_hostname}-script-recently`)
};

export const script_localised = {
  name: `${unique_hostname}-script-localised`,
  get: () => {
    const key = `${unique_hostname}-script-localised`;
    const item = localStorage.getItem(key);
    if (!item) return [];
    try {
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },
  set: (data: any) => {
    const key = `${unique_hostname}-script-localised`;
    const item = localStorage.getItem(key);
    let items: string[] = [];
    if (item) {
      try {
        items = JSON.parse(item);
        if (!Array.isArray(items)) items = [];
      } catch {
        items = [];
      }
    }
    const is_dup = items.find((el: any) => el._id === data._id);
    if(is_dup){
      items = items.filter((el: any) => el._id !== data._id);
      localStorage.setItem(key, JSON.stringify(items));      
      return items
    }
    localStorage.setItem(key, JSON.stringify([data, ...items]));
    return items;
  },
  remove: () => localStorage.removeItem(`${unique_hostname}-script-localised`)
};
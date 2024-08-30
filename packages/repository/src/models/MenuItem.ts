export class MenuItem {
    constructor(id: string | null, title: string | null, route: string | null, icon: string | null, children: MenuItem[], active: boolean = false, addEntityId = false) {
        this.id = id;
        this.route = route;
        this.icon = icon;
        this.title = title;
        this.children = children;        
        this.active = active;
        this.addEntityId = addEntityId;
    }

    id: string | null = null;
    route: string | null = null;
    icon: string | null = null;
    title: string | null = null;
    children: MenuItem[] = [];
    active: boolean = false;
    addEntityId: boolean = false;
  }

const baseUrl = "http://localhost:9090/toDo";

export const getAllToDos = async () => {
    return fetch(`${baseUrl}/getAll`).then((response) => response.json());
}

export const getToDoStats = async () => {
    return fetch(`${baseUrl}/getStats`).then((response) => response.json());
}

export const addToDo = async (toDo) => {
    return await fetch(`${baseUrl}/addToDo`,{
        method: "POST",
        body: JSON.stringify(toDo),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
};

export const markToDoAsDone = async (id) => {
    return await fetch(`${baseUrl}/${id}/done`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });
}

export const markToDoAsUndone = async (id) => {
    return await fetch(`${baseUrl}/${id}/undone`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });
};

export const deleteToDo = async (id) => {
    return await fetch(`${baseUrl}/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
};

export const updateToDo = async (id, toDo) => {
    return await fetch(`${baseUrl}/${id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDo)
    });
};

export const sortToDos = async (data, priorityOrder, dateOrder) => {
    return await fetch(`${baseUrl}/sortToDos?priorityOrder=${priorityOrder}&dateOrder=${dateOrder}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export const filterToDosByName = async (data, name) => {
    return await fetch(`${baseUrl}/filterByName?name=${name}`, data).then((response) => response.json());
};

export const filterToDosByPriority = async (data, priority) => {
    return await fetch(`${baseUrl}/filterByPriority?priority=${priority}`, data).then((response) => response.json());
};

export const filterToDosByFlag = async (data, flag) => {
    return await fetch(`${baseUrl}/filterByFlag?flag=${flag}`, data).then((response) => response.json());
}
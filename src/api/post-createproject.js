async function postCreateproject(project_name, description, image, goal, is_open, create_date, end_date, token) {

    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "project_name": project_name,
            "description": description,
            "image": image,
            "goal": goal,
            "is_open": is_open,
            "create_date": create_date,
            "end_date": end_date

        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create project`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postCreateproject;
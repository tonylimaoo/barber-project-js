export async function getAppointments() {
    const response = await fetch('https://sheetdb.io/api/v1/v223jabyp41hi?sort_by=date') 
    const users = await response.json()

    return users || []
}
import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"
import { getCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId,
                plumberId,
                date_created: new Date().toLocaleDateString("en-US")
            }
            saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)


export const Requests = () => {
    const plumbers = getPlumbers()
    const completions = getCompletions()
    const requests = getRequests()

    let html = `<ul class="requests">
    ${requests.map(request => {

        if (completions.find(completion => request.id === parseInt(completion.requestId))) {
            let requestComplete = `
        <li class="request_complete">
        <span class="description">${request.description}</span>
        <span class ="middleItem"><b>Complete</b></span>
        <button class="request_delete" id="request--${request.id}">Delete</button>
        </li>
        `
            return requestComplete
        } else {
            let requestOpen = `
        <li class="request_open">
        <span class="description">${request.description}</span>
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option> ${plumbers.map(plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }).join("")}
        </select>
            <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>`

            return requestOpen
        }
    }).join("")
        }
</ul>
`
    return html
}
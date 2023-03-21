import { fetchCompletions, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"
import { fetchPlumbers } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged", 
    CustomEvent => {render()}
)
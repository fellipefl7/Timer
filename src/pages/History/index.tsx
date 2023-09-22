import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
  return(
    <HistoryContainer>
       <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>30 min</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>60 min</td>
              <td>1 week ago</td>
              <td>
                <Status statusColor="green">In Progress</Status>
              </td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>15 min</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="yellow">In Progress</Status>
              </td>
            </tr>
            <tr>
              <td>Task 4</td>
              <td>99 weeks</td>
              <td>1 day ago</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
          </tbody>
        </table>
       </HistoryList>
    </HistoryContainer>
  )
}
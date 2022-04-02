import "./List.css"
import Delete from './Delete'
import Edit from './Edit'

const List = ( {museums} ) => {
    return (
    <div className="container">
        <ul>
            {museums.map(museum => (
                <li key={museum} className="list-item"><input type="checkbox"></input>{museum}<Edit /><Delete /> </li>
            ))}
        </ul>
    </div>
    )
};

export default List;


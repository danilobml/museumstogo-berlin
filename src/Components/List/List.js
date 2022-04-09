import "./List.css"
import Delete from './Delete'
import Edit from './Edit'

const List = ( {museums} ) => {
    return (
    <div className="container">
        <ul>
            {museums.map(museum => (
                <li key={museum.index} className="list-item"><input type="checkbox"></input>{museum.name}<Edit /><Delete /> </li>
            ))}
        </ul>
    </div>
    )
};

export default List;


'use strict';

const e = React.createElement;

const AppNav = () => (
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">My Blog</a>
        <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a>
    </nav>
);

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        const response = await fetch('/posts');
        const data = await response.json();
        data.forEach(item => item.editMode = false);
        this.setState({ data })
    }

    render() {
        return (
            <div>
                <AppNav />
                {
                    this.state.data.length > 0 ? (
                        this.state.data.map(item =>
                            <Card item={item} />)
                    ) : (
                            <div class="card mt-5 col-sm">
                                <div class="card-body">I have not added any posts! ... yet!</div>
                            </div>
                        )
                }
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Home), domContainer);


const Card = ({ item }) => {
    const { title, content } = item;
    {
        return (
            <div class="card mt-4" Style="width: 100%;">
                <div class="card-body">
                    <h5 class="card-title">{title || "No Title"}</h5>
                    <p class="card-text">{content || "No Content"}</p>
                    {/* <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button> */}
                    {/* <button type="submit" class="btn btn-info btn-sm ml-2" onClick={handleEdit}>Edit</button> */}
                </div>
            </div>
        )
    }
}
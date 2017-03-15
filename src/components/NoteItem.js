import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NoteItem extends Component {
    render() {
        return (
            <div class="bootcards-list">
                <div class="panel panel-default">
                    <div class="list-group">
                        <a class="list-group-item" href="#">
                            <img src="../avatar.png" class="img-rounded pull-left"/>
                            <h4 class="list-group-item-heading">Acey, Sofia</h4>
                            <p class="list-group-item-text">Masung Corp.</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

NoteItem.propTypes = {
    note: React.PropTypes.object.isRequired
}

export default NoteItem;
import React from 'react';
import './App.css';

class Generator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {version: '', nextVersion: ''}
  }

  render() {
    const { version, nextVersion } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h3>
            Release script generator
          </h3>
          <div>
            <label>Release version: </label>
            <input type="text" value={version} onChange={(e) => this.setState({version: e.target.value})} />
            <label>Next version: </label>
            <input type="text" value={nextVersion} onChange={(e) => this.setState({nextVersion: e.target.value})} />
          </div>
          <div className="script mt-5">
            <div><code>git checkout -b release-{version} develop</code></div>
            <div className="mt-3"><code>git checkout master</code></div>
            <div><code>git merge --no-ff release-{version}</code></div>
            <div><code>git tag -a {version}</code></div>
            <div className="mt-3"><code>git checkout develop</code></div>
            <div><code>git merge --no-ff release-{version}</code></div>
            <div className="mt-3"><code>git checkout develop # skip if performed in previous step</code></div>
            <div><code>./bump-versions.sh {nextVersion}</code></div>
            <div><code>git commit -a -m "Bump version number to {nextVersion}"</code></div>
            <div className="mt-3"><code>git branch -d release-{version}</code></div>
            <div className="mt-3"><code>git push --tags</code></div>
          </div>
        </header>
      </div>
    );
  }
}

export default Generator;

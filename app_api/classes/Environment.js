class Environment {
    constructor(source) {
        let repository;
        let commit;
        if (!source.includes('@')) {
            repository = source;
            commit = 'master';
        }
        else {
            [repository, commit] = source.split('@');
        }
        this.repository = repository;
        this.commit = commit;
        this.sourceDir = null;
        this.entrypoints = null;
    }
}

module.exports = Environment;
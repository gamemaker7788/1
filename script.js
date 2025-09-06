// JavaScript Document
class CommentApp {
    constructor() {
        this.initFirebase();
        this.bindEvents();
        this.loadComments();
    }

    initFirebase() {
        this.db = firebase.firestore();
        this.commentsRef = this.db.collection('comments');
    }

    bindEvents() {
        document.getElementById('submit-comment').addEventListener('click', () => this.submitComment());
    }

    loadComments() {
        this.commentsRef.orderBy('timestamp', 'desc').limit(50)
            .onSnapshot(snapshot => {
                const container = document.getElementById('comments-container');
                container.innerHTML = '';
                
                if (snapshot.empty) {
                    container.innerHTML = '<div class="no-comments">还没有评论，快来发表第一条吧！</div>';
                    return;
                }

                snapshot.forEach(doc => {
                    const comment = doc.data();
                    container.appendChild(this.createCommentElement(comment));
                });
            });
    }

    submitComment() {
        const content = document.getElementById('comment-input').value.trim();
        const username = document.getElementById('username').value.trim() || '匿名用户';
        
        if (!content) {
            alert('请输入评论内容');
            return;
        }

        this.commentsRef.add({
            username: username,
            content: content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            ip: '' // 可以添加更多元数据
        })
        .then(() => {
            document.getElementById('comment-input').value = '';
        })
        .catch(error => {
            console.error('添加评论失败:', error);
            alert('发布评论失败，请稍后再试');
        });
    }

    createCommentElement(comment) {
        const element = document.createElement('div');
        element.className = 'comment';
        
        const header = document.createElement('div');
        header.className = 'comment-header';
        
        const username = document.createElement('span');
        username.className = 'username';
        username.textContent = comment.username;
        
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = comment.timestamp?.toDate().toLocaleString();
        
        const content = document.createElement('div');
        content.className = 'comment-content';
        content.textContent = comment.content;
        
        header.appendChild(username);
        header.appendChild(timestamp);
        element.appendChild(header);
        element.appendChild(content);
        
        return element;
    }
}

// 初始化应用
window.onload = () => new CommentApp();

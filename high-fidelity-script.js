// JavaScript for high-fidelity prototype
document.addEventListener('DOMContentLoaded', function() {
    // Screen content data
    const screenContent = {
        // Knowledge Screen
        knowledge: `
            <div class="header">
                <h2 class="screen-title">知识点预习</h2>
            </div>
            
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-input" placeholder="搜索知识点...">
            </div>
            
            <div class="section">
                <h3 class="section-title">热门知识点</h3>
                <div class="popular-items">
                    <div class="popular-item" data-id="1">
                        <div class="popular-icon">
                            <i class="fas fa-database"></i>
                        </div>
                        <span class="popular-title">数据结构</span>
                    </div>
                    <div class="popular-item" data-id="2">
                        <div class="popular-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <span class="popular-title">算法</span>
                    </div>
                    <div class="popular-item" data-id="3">
                        <div class="popular-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <span class="popular-title">编程语言</span>
                    </div>
                    <div class="popular-item" data-id="4">
                        <div class="popular-icon">
                            <i class="fas fa-sitemap"></i>
                        </div>
                        <span class="popular-title">设计模式</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h3 class="section-title">全部知识点</h3>
                <div class="card" data-id="1">
                    <div class="knowledge-item">
                        <i class="fas fa-square knowledge-bullet"></i>
                        <div class="knowledge-content">
                            <h4 class="knowledge-title">数据结构基础</h4>
                            <p class="knowledge-description">包括数组、链表、栈、队列、树、图等</p>
                        </div>
                    </div>
                </div>
                <div class="card" data-id="2">
                    <div class="knowledge-item">
                        <i class="fas fa-square knowledge-bullet"></i>
                        <div class="knowledge-content">
                            <h4 class="knowledge-title">算法设计与分析</h4>
                            <p class="knowledge-description">包括排序算法、查找算法、动态规划等</p>
                        </div>
                    </div>
                </div>
                <div class="card" data-id="3">
                    <div class="knowledge-item">
                        <i class="fas fa-square knowledge-bullet"></i>
                        <div class="knowledge-content">
                            <h4 class="knowledge-title">程序设计基础</h4>
                            <p class="knowledge-description">包括变量、表达式、控制流、函数等</p>
                        </div>
                    </div>
                </div>
                <div class="card" data-id="4">
                    <div class="knowledge-item">
                        <i class="fas fa-square knowledge-bullet"></i>
                        <div class="knowledge-content">
                            <h4 class="knowledge-title">面向对象编程</h4>
                            <p class="knowledge-description">包括类、对象、继承、多态、封装等</p>
                        </div>
                    </div>
                </div>
                <div class="card" data-id="5">
                    <div class="knowledge-item">
                        <i class="fas fa-square knowledge-bullet"></i>
                        <div class="knowledge-content">
                            <h4 class="knowledge-title">软件工程</h4>
                            <p class="knowledge-description">包括软件开发过程、软件测试、项目管理等</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        // Exercise Screen
        exercise: `
            <div class="header">
                <h2 class="screen-title">习题练习</h2>
            </div>
            
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-input" placeholder="搜索习题...">
            </div>
            
            <div class="section">
                <h3 class="section-title">难度筛选</h3>
                <div class="tags-container">
                    <div class="tag active">全部</div>
                    <div class="tag">简单</div>
                    <div class="tag">中等</div>
                    <div class="tag">困难</div>
                </div>
            </div>
            
            <div class="section">
                <h3 class="section-title">类型筛选</h3>
                <div class="tags-container">
                    <div class="tag active">全部</div>
                    <div class="tag">数组</div>
                    <div class="tag">字符串</div>
                    <div class="tag">动态规划</div>
                    <div class="tag">图论</div>
                    <div class="tag">树</div>
                </div>
            </div>
            
            <div class="section">
                <div class="card" data-id="101">
                    <div class="exercise-header">
                        <h4 class="exercise-title">两数之和</h4>
                        <span class="difficulty-tag easy">简单</span>
                    </div>
                    <p class="exercise-description">给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。</p>
                </div>
                
                <div class="card" data-id="102">
                    <div class="exercise-header">
                        <h4 class="exercise-title">最长回文子串</h4>
                        <span class="difficulty-tag medium">中等</span>
                    </div>
                    <p class="exercise-description">给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。</p>
                </div>
                
                <div class="card" data-id="103">
                    <div class="exercise-header">
                        <h4 class="exercise-title">无重复字符的最长子串</h4>
                        <span class="difficulty-tag medium">中等</span>
                    </div>
                    <p class="exercise-description">给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。</p>
                </div>
                
                <div class="card" data-id="104">
                    <div class="exercise-header">
                        <h4 class="exercise-title">最长递增子序列</h4>
                        <span class="difficulty-tag medium">中等</span>
                    </div>
                    <p class="exercise-description">给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。</p>
                </div>
                
                <div class="card" data-id="105">
                    <div class="exercise-header">
                        <h4 class="exercise-title">课程表</h4>
                        <span class="difficulty-tag medium">中等</span>
                    </div>
                    <p class="exercise-description">你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses-1 。在选修某些课程之前需要一些先修课程。</p>
                </div>
            </div>
        `,
        
        // Discussion Screen
        discussion: `
            <div class="header">
                <h2 class="screen-title">问答讨论</h2>
                <div class="header-action">
                    <button class="btn-icon">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            
            <div class="tags-container">
                <div class="tag active">全部</div>
                <div class="tag">算法</div>
                <div class="tag">数据结构</div>
                <div class="tag">编程语言</div>
                <div class="tag">数据库</div>
            </div>
            
            <div class="section">
                <div class="card" data-id="1">
                    <div class="question-header">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" class="avatar" alt="User Avatar">
                        <div class="question-info">
                            <h4 class="user-name">王小明</h4>
                            <span class="post-time">2小时前</span>
                        </div>
                    </div>
                    <h4 class="question-title">动态规划的状态转移方程如何推导？</h4>
                    <p class="question-content">动态规划的状态转移方程如何推导？我理解基本概念，但在实际应用时总是遇到困难。</p>
                    <img src="https://miro.medium.com/max/1400/1*gzvzPcYR4bwA-1pjVBJ7Ig.jpeg" class="question-image" alt="Question Image">
                    <div class="question-footer">
                        <div class="answers-count">
                            <i class="fas fa-comment-alt"></i>
                            <span>2条回答</span>
                        </div>
                        <button class="btn-text">查看详情</button>
                    </div>
                </div>
                
                <div class="card" data-id="2">
                    <div class="question-header">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" class="avatar" alt="User Avatar">
                        <div class="question-info">
                            <h4 class="user-name">李华</h4>
                            <span class="post-time">1小时前</span>
                        </div>
                    </div>
                    <h4 class="question-title">有没有人知道如何优化快速排序？</h4>
                    <p class="question-content">有没有人知道如何优化快速排序算法？我在处理大数据集时遇到了性能问题。</p>
                    <div class="question-footer">
                        <div class="answers-count">
                            <i class="fas fa-comment-alt"></i>
                            <span>0条回答</span>
                        </div>
                        <button class="btn-text">查看详情</button>
                    </div>
                </div>
                
                <div class="card" data-id="3">
                    <div class="question-header">
                        <img src="https://randomuser.me/api/portraits/men/68.jpg" class="avatar" alt="User Avatar">
                        <div class="question-info">
                            <h4 class="user-name">张教授 <span class="expert-badge">专家</span></h4>
                            <span class="post-time">3小时前</span>
                        </div>
                    </div>
                    <h4 class="question-title">解释B+树和B树的区别</h4>
                    <p class="question-content">有同学能详细解释一下B+树和B树在实际应用中的主要区别吗？特别是在数据库索引方面。</p>
                    <div class="question-footer">
                        <div class="answers-count">
                            <i class="fas fa-comment-alt"></i>
                            <span>5条回答</span>
                        </div>
                        <button class="btn-text">查看详情</button>
                    </div>
                </div>
            </div>
            
            <div class="floating-btn">
                <i class="fas fa-plus"></i>
            </div>
        `,
        
        // Exam Screen
        exam: `
            <div class="header">
                <h2 class="screen-title">GESP真题</h2>
            </div>
            
            <div class="section">
                <h3 class="section-title">年份</h3>
                <div class="tags-container">
                    <div class="tag active">全部</div>
                    <div class="tag">2023</div>
                    <div class="tag">2022</div>
                    <div class="tag">2021</div>
                    <div class="tag">2020</div>
                </div>
            </div>
            
            <div class="section">
                <h3 class="section-title">级别</h3>
                <div class="tags-container">
                    <div class="tag active">全部</div>
                    <div class="tag">初级</div>
                    <div class="tag">中级</div>
                    <div class="tag">高级</div>
                </div>
            </div>
            
            <div class="section">
                <div class="card" data-id="1">
                    <h4 class="exam-title">2023年GESP中级真题</h4>
                    <div class="exam-details">
                        <p class="exam-date">考试时间：2023年6月</p>
                        <p class="exam-level">级别：中级</p>
                    </div>
                    <div class="exam-footer">
                        <button class="btn-text">
                            <i class="fas fa-file-alt"></i>
                            查看真题
                        </button>
                    </div>
                </div>
                
                <div class="card" data-id="2">
                    <h4 class="exam-title">2022年GESP高级真题</h4>
                    <div class="exam-details">
                        <p class="exam-date">考试时间：2022年12月</p>
                        <p class="exam-level">级别：高级</p>
                    </div>
                    <div class="exam-footer">
                        <button class="btn-text">
                            <i class="fas fa-file-alt"></i>
                            查看真题
                        </button>
                    </div>
                </div>
                
                <div class="card" data-id="3">
                    <h4 class="exam-title">2022年GESP中级真题</h4>
                    <div class="exam-details">
                        <p class="exam-date">考试时间：2022年6月</p>
                        <p class="exam-level">级别：中级</p>
                    </div>
                    <div class="exam-footer">
                        <button class="btn-text">
                            <i class="fas fa-file-alt"></i>
                            查看真题
                        </button>
                    </div>
                </div>
                
                <div class="card" data-id="4">
                    <h4 class="exam-title">2021年GESP初级真题</h4>
                    <div class="exam-details">
                        <p class="exam-date">考试时间：2021年12月</p>
                        <p class="exam-level">级别：初级</p>
                    </div>
                    <div class="exam-footer">
                        <button class="btn-text">
                            <i class="fas fa-file-alt"></i>
                            查看真题
                        </button>
                    </div>
                </div>
                
                <div class="card" data-id="5">
                    <h4 class="exam-title">2021年GESP中级真题</h4>
                    <div class="exam-details">
                        <p class="exam-date">考试时间：2021年6月</p>
                        <p class="exam-level">级别：中级</p>
                    </div>
                    <div class="exam-footer">
                        <button class="btn-text">
                            <i class="fas fa-file-alt"></i>
                            查看真题
                        </button>
                    </div>
                </div>
            </div>
        `,
        
        // Profile Screen
        profile: `
            <div class="header">
                <h2 class="screen-title">我的</h2>
            </div>
            
            <div class="profile-header">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="profile-avatar" alt="Profile Avatar">
                <div class="profile-info">
                    <h3 class="profile-name">王小明</h3>
                    <p class="profile-bio">努力学习 CCF-GESP 中...</p>
                </div>
            </div>
            
            <div class="section">
                <div class="menu-list">
                    <div class="menu-item">
                        <i class="fas fa-bookmark menu-icon"></i>
                        <span class="menu-title">我的收藏</span>
                        <i class="fas fa-chevron-right menu-arrow"></i>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-history menu-icon"></i>
                        <span class="menu-title">学习记录</span>
                        <i class="fas fa-chevron-right menu-arrow"></i>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-exclamation-circle menu-icon"></i>
                        <span class="menu-title">错题本</span>
                        <i class="fas fa-chevron-right menu-arrow"></i>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-cog menu-icon"></i>
                        <span class="menu-title">API设置</span>
                        <i class="fas fa-chevron-right menu-arrow"></i>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="api-settings-card">
                    <h3 class="settings-title">DeepSeek API 设置</h3>
                    <div class="form-group">
                        <label>API Key</label>
                        <div class="api-key-input">
                            <input type="password" value="••••••••••••••••" placeholder="输入DeepSeek API Key">
                            <i class="fas fa-eye"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>API 端点</label>
                        <input type="text" value="https://api.deepseek.com/v1" placeholder="API端点URL">
                    </div>
                    <div class="form-group">
                        <label>API 模型</label>
                        <select>
                            <option selected>DeepSeek Chat</option>
                            <option>DeepSeek Coder</option>
                        </select>
                    </div>
                    <button class="btn btn-primary">保存设置</button>
                </div>
            </div>
        `,
    };

    // Initialize app by setting up screens
    function initApp() {
        const appContent = document.querySelector('.app-content');
        
        // Create screens
        Object.keys(screenContent).forEach(screen => {
            const screenElement = document.createElement('div');
            screenElement.className = `screen ${screen}-screen`;
            screenElement.id = `${screen}-screen`;
            screenElement.innerHTML = screenContent[screen];
            appContent.appendChild(screenElement);
        });
        
        // Show the first screen (knowledge)
        document.getElementById('knowledge-screen').classList.add('active');
        
        // Set up tab bar event listeners
        setupTabBar();
        
        // Set up click handlers for various elements
        setupClickHandlers();
    }
    
    // Set up tab bar navigation
    function setupTabBar() {
        const tabItems = document.querySelectorAll('.tab-item');
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabItems.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all screens
                const screens = document.querySelectorAll('.screen');
                screens.forEach(screen => screen.classList.remove('active'));
                
                // Show selected screen
                const screenName = this.getAttribute('data-screen');
                document.getElementById(`${screenName}-screen`).classList.add('active');
            });
        });
    }
    
    // Set up click handlers for interactive elements
    function setupClickHandlers() {
        // Add event delegation for all screens
        document.querySelector('.app-content').addEventListener('click', function(e) {
            // Handle card clicks
            if (e.target.closest('.card')) {
                const card = e.target.closest('.card');
                const id = card.getAttribute('data-id');
                
                // Handle based on which screen we're on
                const activeScreen = document.querySelector('.screen.active');
                
                if (activeScreen.classList.contains('knowledge-screen')) {
                    console.log('Knowledge item clicked:', id);
                    alert('打开知识点详情: ' + id);
                }
                else if (activeScreen.classList.contains('exercise-screen')) {
                    console.log('Exercise item clicked:', id);
                    alert('打开习题详情: ' + id);
                }
                else if (activeScreen.classList.contains('discussion-screen')) {
                    console.log('Discussion item clicked:', id);
                    alert('打开讨论详情: ' + id);
                }
                else if (activeScreen.classList.contains('exam-screen')) {
                    console.log('Exam item clicked:', id);
                    alert('打开真题详情: ' + id);
                }
            }
            
            // Handle tag clicks
            if (e.target.classList.contains('tag')) {
                const tags = e.target.closest('.tags-container').querySelectorAll('.tag');
                tags.forEach(tag => tag.classList.remove('active'));
                e.target.classList.add('active');
            }
            
            // Handle floating button clicks
            if (e.target.closest('.floating-btn')) {
                alert('创建新问题');
            }
        });
    }
    
    // Initialize the application
    initApp();
}); 
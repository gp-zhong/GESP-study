document.addEventListener('DOMContentLoaded', function() {
    // 禁用iOS上的双击缩放
    document.addEventListener('touchend', function(event) {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    let lastTouchEnd = 0;
    
    // 底部导航功能
    const tabItems = document.querySelectorAll('.tab-item');
    const pages = document.querySelectorAll('.page');

    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有导航项的活动状态
            tabItems.forEach(tab => tab.classList.remove('active'));
            // 添加当前项的活动状态
            this.classList.add('active');
            
            // 隐藏所有页面
            pages.forEach(page => {
                page.style.opacity = '0';
                page.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    page.classList.remove('active');
                }, 300);
            });
            
            // 显示对应页面
            const pageName = this.getAttribute('data-page');
            const targetPage = document.getElementById(`${pageName}-page`);
            
            setTimeout(() => {
                targetPage.classList.add('active');
                // 滚动到顶部
                document.querySelector('.main-content').scrollTop = 0;
                // 触发重绘以应用过渡效果
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);
            }, 300);
        });
    });

    // 筛选标签点击
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 主题标签点击
    const topicTabs = document.querySelectorAll('.topic-tab');
    topicTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            topicTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 知识点详情查看
    const viewButtons = document.querySelectorAll('.view-btn');
    const knowledgeModal = document.getElementById('knowledge-detail-modal');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const knowledgeItem = this.closest('.knowledge-item');
            const knowledgeTitle = knowledgeItem.querySelector('h3').textContent;
            const modalTitle = knowledgeModal.querySelector('h2');
            
            // 更新模态窗口标题和图标
            const iconClass = knowledgeItem.querySelector('h3 i').className;
            modalTitle.innerHTML = `<i class="${iconClass}"></i> ${knowledgeTitle.replace(/(^\s*<i[^>]*><\/i>\s*|\s*$)/g, '')}`;
            
            // 显示模态窗口
            knowledgeModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            
            // 添加渐入动画
            setTimeout(() => {
                knowledgeModal.style.opacity = '1';
                knowledgeModal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // 习题解答
    const solveButtons = document.querySelectorAll('.solve-btn');
    const exerciseModal = document.getElementById('exercise-modal');
    
    solveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exerciseItem = this.closest('.exercise-item');
            const exerciseTitle = exerciseItem.querySelector('h3').textContent;
            const modalTitle = exerciseModal.querySelector('h2');
            
            // 更新模态窗口标题
            modalTitle.textContent = exerciseTitle;
            
            // 更新难度标签
            const difficultyText = exerciseItem.querySelector('.difficulty-tag').textContent;
            const difficultyClass = exerciseItem.querySelector('.difficulty-tag').classList[1];
            exerciseModal.querySelector('.difficulty-tag').textContent = difficultyText;
            exerciseModal.querySelector('.difficulty-tag').className = `difficulty-tag ${difficultyClass}`;
            
            // 显示模态窗口
            exerciseModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 添加渐入动画
            setTimeout(() => {
                exerciseModal.style.opacity = '1';
                exerciseModal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // GESP真题查看
    const viewExamButtons = document.querySelectorAll('.view-exam-btn');
    const examPaperModal = document.getElementById('exam-paper-modal');
    
    viewExamButtons.forEach(button => {
        button.addEventListener('click', function() {
            const examItem = this.closest('.exam-item');
            const examTitle = examItem.querySelector('h3').textContent;
            const modalTitle = examPaperModal.querySelector('h2');
            
            // 更新模态窗口标题
            modalTitle.textContent = examTitle;
            
            // 显示模态窗口
            examPaperModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 添加渐入动画
            setTimeout(() => {
                examPaperModal.style.opacity = '1';
                examPaperModal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // AI解析功能
    const aiSolutionButtons = document.querySelectorAll('.ai-solution-btn');
    
    aiSolutionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 找到最近的AI解析容器
            const aiSolution = this.nextElementSibling;
            
            if (aiSolution.style.display === 'block') {
                // 隐藏解析
                aiSolution.style.opacity = '0';
                aiSolution.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    aiSolution.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-robot"></i> DeepSeek解析';
                }, 300);
            } else {
                // 显示解析
                aiSolution.style.display = 'block';
                aiSolution.style.opacity = '0';
                aiSolution.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    aiSolution.style.opacity = '1';
                    aiSolution.style.transform = 'translateY(0)';
                    this.innerHTML = '<i class="fas fa-times-circle"></i> 隐藏解析';
                }, 50);
            }
        });
    });

    // 实现模态窗口拖拽关闭功能
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        const dragHandle = modal.querySelector('.modal-drag-handle');
        
        let startY = 0;
        let currentY = 0;
        let initialTranslate = 0;
        
        // 拖拽开始
        function dragStart(e) {
            startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            initialTranslate = 0;
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('touchend', dragEnd);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
            modalContent.style.transition = 'none';
        }
        
        // 拖拽中
        function drag(e) {
            if (e.type === 'touchmove') {
                e.preventDefault(); // 防止滚动
            }
            
            currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            const deltaY = currentY - startY;
            
            // 只允许向下拖拽
            if (deltaY > 0) {
                modalContent.style.transform = `translateY(${deltaY}px)`;
                
                // 随着拖拽距离增加而降低不透明度
                const opacity = 1 - (deltaY / window.innerHeight);
                modal.style.backgroundColor = `rgba(0, 0, 0, ${Math.max(0.1, opacity * 0.5)})`;
            }
        }
        
        // 拖拽结束
        function dragEnd(e) {
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', dragEnd);
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
            
            modalContent.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            currentY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
            const deltaY = currentY - startY;
            
            // 如果拖拽距离超过阈值，关闭模态窗口
            if (deltaY > window.innerHeight * 0.15) {
                closeModal(modal);
            } else {
                // 否则恢复原位
                modalContent.style.transform = 'translateY(0)';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }
        }
        
        // 添加拖拽事件监听
        if (dragHandle) {
            dragHandle.addEventListener('touchstart', dragStart, { passive: true });
            dragHandle.addEventListener('mousedown', dragStart);
        }
    });
    
    // 关闭模态窗口的函数
    function closeModal(modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        modal.style.opacity = '0';
        modalContent.style.transform = 'translateY(100%)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // 关闭模态窗口
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // 点击模态窗口外部关闭
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal(this);
            }
        });
    });

    // 模拟状态栏时间更新
    function updateStatusBarTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // 格式化时间
        if (minutes < 10) minutes = '0' + minutes;
        
        document.querySelector('.status-bar .time').textContent = `${hours}:${minutes}`;
    }
    
    // 初始设置时间
    updateStatusBarTime();
    // 每分钟更新一次
    setInterval(updateStatusBarTime, 60000);

    // 上传图片功能
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.querySelector('.upload-area input[type="file"]');
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            const fileName = event.target.files[0].name;
            const fileInfo = document.createElement('p');
            fileInfo.className = 'file-info';
            fileInfo.innerHTML = `<i class="fas fa-file-image"></i> ${fileName} <span class="remove-file"><i class="fas fa-times"></i></span>`;
            
            const existingFileInfo = uploadArea.querySelector('.file-info');
            if (existingFileInfo) {
                uploadArea.removeChild(existingFileInfo);
            }
            
            uploadArea.appendChild(fileInfo);
            
            // 添加删除文件功能
            const removeFile = fileInfo.querySelector('.remove-file');
            removeFile.addEventListener('click', function(e) {
                e.stopPropagation();
                uploadArea.removeChild(fileInfo);
                fileInput.value = '';
            });
        }
    });

    // DeepSeek API设置保存
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    
    saveSettingsBtn.addEventListener('click', function() {
        const apiKey = document.getElementById('api-key').value;
        const apiEndpoint = document.getElementById('api-endpoint').value;
        const apiModel = document.getElementById('api-model').value;
        
        if (!apiKey) {
            showNotification('请输入API Key', 'error');
            return;
        }
        
        // 保存到localStorage
        const settings = {
            apiKey,
            apiEndpoint,
            apiModel
        };
        
        localStorage.setItem('deepseekSettings', JSON.stringify(settings));
        showNotification('设置已保存！', 'success');
        
        // 添加触觉反馈（如果支持）
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    // 显示通知
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 淡入动画
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // 自动消失
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // 加载保存的设置
    function loadSettings() {
        const savedSettings = localStorage.getItem('deepseekSettings');
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            
            document.getElementById('api-key').value = settings.apiKey || '';
            document.getElementById('api-endpoint').value = settings.apiEndpoint || 'https://api.deepseek.com/v1';
            document.getElementById('api-model').value = settings.apiModel || 'deepseek-chat';
        }
    }
    
    // 页面加载时读取设置
    loadSettings();

    // 模拟DeepSeek API调用（实际开发中需替换为真实API调用）
    function callDeepSeekAPI(prompt) {
        // 在实际开发中，这里应该是对DeepSeek API的调用
        // 这里只是一个模拟的响应
        return new Promise(resolve => {
            // 显示加载动画
            const loadingElement = document.createElement('div');
            loadingElement.className = 'loading-animation';
            loadingElement.innerHTML = '<div class="spinner"></div><p>正在分析...</p>';
            
            document.querySelector('.solution-analysis').prepend(loadingElement);
            
            setTimeout(() => {
                resolve({
                    response: "这是DeepSeek API的模拟响应。在实际开发中，这里将由DeepSeek生成的回答替代。"
                });
                
                // 移除加载动画
                loadingElement.remove();
                
                // 添加触觉反馈（如果支持）
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 2000);
        });
    }

    // 提交解答
    const submitSolutionBtn = document.querySelector('.submit-solution-btn');
    
    submitSolutionBtn.addEventListener('click', function() {
        const solution = document.querySelector('.your-solution textarea').value;
        
        if (!solution.trim()) {
            showNotification('请先输入你的解答！', 'error');
            return;
        }
        
        // 调用DeepSeek API分析解答
        callDeepSeekAPI(solution).then(response => {
            // 这里可以展示DeepSeek的分析结果
            showNotification('解答已提交并分析完成！', 'success');
        });
    });

    // 提交问题
    const submitQuestionBtn = document.querySelector('.submit-btn');
    
    submitQuestionBtn.addEventListener('click', function() {
        const question = document.querySelector('.post-question textarea').value;
        
        if (!question.trim()) {
            showNotification('请输入你的问题！', 'error');
            return;
        }
        
        // 这里应该有提交问题到服务器的逻辑
        showNotification('问题已提交成功！', 'success');
        document.querySelector('.post-question textarea').value = '';
        
        // 清除已上传的文件
        const fileInfo = document.querySelector('.upload-area .file-info');
        if (fileInfo) {
            fileInfo.remove();
        }
        document.querySelector('.upload-area input[type="file"]').value = '';
        
        // 添加触觉反馈（如果支持）
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    // 初始页面加载时设置模态窗口样式
    modals.forEach(modal => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
    });

    // 添加适配手机安全区域的处理
    function updateSafeAreaPadding() {
        // 获取底部安全区域高度
        const safeAreaBottom = getComputedStyle(document.documentElement).getPropertyValue('--ios-safe-area-bottom');
        const tabBar = document.querySelector('.tab-bar');
        
        // 应用底部padding
        if (safeAreaBottom && safeAreaBottom !== '0px') {
            tabBar.style.paddingBottom = safeAreaBottom;
        }
    }
    
    // 初始调用
    updateSafeAreaPadding();
    
    // 屏幕旋转或大小变化时重新调整
    window.addEventListener('resize', updateSafeAreaPadding);
    
    // 添加下拉刷新效果
    let startY = 0;
    let refreshThreshold = 60; // 下拉多少像素触发刷新
    let refreshElement = null;
    
    document.querySelector('.main-content').addEventListener('touchstart', function(e) {
        if (this.scrollTop === 0) {
            startY = e.touches[0].clientY;
            
            // 创建刷新指示器
            if (!refreshElement) {
                refreshElement = document.createElement('div');
                refreshElement.className = 'refresh-indicator';
                refreshElement.innerHTML = '<i class="fas fa-arrow-down"></i>';
                refreshElement.style.position = 'absolute';
                refreshElement.style.top = '0';
                refreshElement.style.left = '50%';
                refreshElement.style.transform = 'translateX(-50%) translateY(-100%)';
                refreshElement.style.padding = '10px';
                refreshElement.style.color = '#999';
                refreshElement.style.textAlign = 'center';
                refreshElement.style.width = '100%';
                refreshElement.style.transition = 'transform 0.2s ease';
                this.prepend(refreshElement);
            }
        }
    });
    
    document.querySelector('.main-content').addEventListener('touchmove', function(e) {
        if (startY !== 0 && this.scrollTop === 0) {
            let currentY = e.touches[0].clientY;
            let delta = currentY - startY;
            
            if (delta > 0) {
                e.preventDefault();
                
                // 移动刷新指示器
                if (refreshElement) {
                    let progress = Math.min(delta / refreshThreshold, 1);
                    refreshElement.style.transform = `translateX(-50%) translateY(${delta * 0.5}px)`;
                    refreshElement.innerHTML = delta > refreshThreshold ? 
                        '<i class="fas fa-spinner fa-spin"></i>' : 
                        '<i class="fas fa-arrow-down"></i>';
                }
            }
        }
    });
    
    document.querySelector('.main-content').addEventListener('touchend', function(e) {
        if (startY !== 0 && refreshElement) {
            let currentY = e.changedTouches[0].clientY;
            let delta = currentY - startY;
            
            if (delta > refreshThreshold) {
                // 模拟刷新
                refreshElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    // 刷新完成
                    refreshElement.style.transform = 'translateX(-50%) translateY(-100%)';
                    
                    setTimeout(() => {
                        if (refreshElement && refreshElement.parentNode) {
                            refreshElement.parentNode.removeChild(refreshElement);
                            refreshElement = null;
                        }
                        showNotification('刷新成功！', 'success');
                    }, 300);
                }, 1000);
            } else {
                // 恢复指示器位置
                refreshElement.style.transform = 'translateX(-50%) translateY(-100%)';
                
                setTimeout(() => {
                    if (refreshElement && refreshElement.parentNode) {
                        refreshElement.parentNode.removeChild(refreshElement);
                        refreshElement = null;
                    }
                }, 300);
            }
            
            startY = 0;
        }
    });
    
    // 设置页面点击区域效果
    const settingsItems = document.querySelectorAll('.form-group');
    settingsItems.forEach(item => {
        item.addEventListener('click', function() {
            const input = this.querySelector('input, select');
            if (input) {
                input.focus();
            }
        });
    });

    // 添加更多移动端触觉反馈
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加触觉反馈（如果支持）
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });

    // 为所有可点击元素添加触摸反馈效果
    const touchItems = document.querySelectorAll('.knowledge-item, .exercise-item, .question-item, .exam-item, .tab-item, .filter-tag, .topic-tab');
    
    touchItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });
        
        item.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        item.addEventListener('touchcancel', function() {
            this.style.opacity = '1';
        });
    });
    
    // 优化移动端输入体验
    const allInputs = document.querySelectorAll('input, textarea');
    
    allInputs.forEach(input => {
        // 处理表单提交，防止移动端键盘的提交行为导致页面刷新
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') {
                e.preventDefault();
                this.blur();
            }
        });
        
        // 恢复滚动位置，解决移动端键盘收起后视图位置问题
        input.addEventListener('blur', function() {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
            }, 100);
        });
    });
}); 
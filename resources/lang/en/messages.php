<?php

return [
    'settings' => 'Settings',
    'account' => 'Account',
    'api_keys' => 'API Keys',
    'notifications' => 'Notifications',
    'common' => 'Common',
    'close' => 'Close',
    'save' => 'Save',
    'notify_when' => 'Notify when you :event',

    'global_roles' => [
        'member' => 'Member',
        'admin' => 'Admin',
        'owner' => 'Owner',
    ],

    'modals' => [
        'members' => [
            'role' => 'Role',
            'select_role' => 'Select role',
            'member' => 'Member',
            'member_email' => 'Member email',
            'invite' => 'Invite',

            'errors' => [
                'email' => 'Email is not valid',
            ],
        ],
        'api_keys' => [
            'add' => 'Add',
            'update' => 'Update',
            'without_expiration' => 'Without expiration',

            'date_defaults' => [
                '7_days' => '7 days',
                '30_days' => '30 days',
                '60_days' => '60 days',
                '90_days' => '90 days',
                'unlimit' => 'No expiration',
            ],

            'errors' => [
                'user' => 'Wrong user',
                'expiration' => 'Wrong expiration date',
            ],
        ],
        'confirm_alert' => [
            'cancel' => 'Cancel',
            'continue' => 'Continue',
        ],
        'env_var' => [
            'select_group' => 'Select group',
            'key' => 'Key',
            'value' => 'Value',
            'add' => 'Add',
            'update' => 'Update',

            'errors' => [
                'key' => 'Wrong key',
                'value' => 'Wrong value',
                'group_id' => 'Wrong group',
            ],
        ],
        'group' => [
            'name' => 'Dev, Prod, ...',
            'add' => 'Add',
            'update' => 'Update',

            'errors' => [
                'name' => 'Wrong name',
            ],
        ],
        'group_users' => [
            'title' => 'Manage :group_name Group Users',
            'search' => 'Search user...',
            'group_members' => 'Group members',
            'team_members' => 'Team members',
            'empty_team_members' => 'No members',
            'cancel' => 'Candel',
            'update' => 'Update',
        ],
        'settings' => [
            'title' => 'Settings',

            'sections' => [
                'common' => 'Common',
                'api_keys' => 'Api keys',
                'notifications' => 'Notifications',
            ],

            'common' => [
                'theme' => [
                    'title' => 'Theme',
                    'variants' => [
                        'light' => 'Light',
                        'dark' => 'Dark',
                        'system' => 'System',
                    ],
                ],
                'language' => [
                    'title' => 'Language',
                    'variants' => [
                        'russian' => 'Russian',
                        'english' => 'English',
                    ],
                ],
            ],

            'api_keys' => [
                'deactivation_confirm' => [
                    'title' => 'Deactivate API Key',
                    'description' => 'Are you sure you want to deactivate this API key? Once deactivated, access through this key will be blocked and cannot be restored.',
                ],

                'empty_list' => 'You don\'t have any active API keys. To obtain an API key, please contact the administrator.',
                'expires_at' => 'Expires at',
                'no_expiration' => 'Without expiration',
                'revoke' => 'Revoke',
                'inactive' => 'Inactive',
            ],

            'notifications' => [
                'settings' => [
                    'add_to_group' => 'Notify when you are added to a group',
                    'add_to_team' => 'Notify when you are added to a team',
                    'remove_from_group' => 'Notify when you are removed from a group',
                    'remove_from_team' => 'Notify when you are removed from a team',
                    'role_change' => 'Notify when your role has been changed',
                    'variable_modified' => 'Notify when variables have been modified',
                ],

                'toggle_confirm' => [
                    'title' => 'Confirm Settings Change',
                    'activate_description' => 'Are you sure you want to enable this setting? The changes will take effect immediately.',
                    'deactivate_description' => 'Are you sure you want to disable this setting? The changes will take effect immediately.',
                ],

                'errors' => [
                    'change_notifications' => 'Error with changing notification settings',
                ],
            ],

            'errors' => [
                'load_api_keys' => 'Error occures while loading api keys',
                'load_settings' => 'Error occures while loading settings',
            ],
        ],
        'team' => [
            'team' => 'Team',
            'type' => 'Type',
            'add' => 'Add',

            'errors' => [
                'name' => 'Wrong name',
                'type' => 'Wrong type',
            ],
        ],
    ],

    'profile_menu' => [
        'account' => 'My account',
        'profile' => 'Profile',
        'billing' => 'Billing',
        'settings' => 'Settings',
        'support' => 'Support',
        'api' => 'API',
        'logout' => 'Log out',
    ],

    'sidebar' => [
        'nav_items' => [
            'workspace' => 'Workspace',
            'groups' => 'Groups',
            'members' => 'Members',
            'invitations' => 'Invitations',
            'api_keys' => 'Api keys',
            'support' => 'Support',
            'feedback' => 'Feedback',
        ],

        'fav_groups' => [
            '' => '',
            'delete_confirm' => [
                'title' => 'Are you sure?',
                'description' => 'This action cannot be undone. This will permanently delete group and remove it data from our servers.',
            ],

            'create_dialog' => [
                'title' => 'Create Group',
            ],

            'group_label' => 'Favourite Groups',
            'group_action' => [
                'title' => 'Add Group',
                'action_text' => 'Add Group',
            ],

            'empty_list' => [
                'message' => 'No favorite groups',
                'tooltip_text' => 'You can add groups to favorite on groups page',
            ],

            'group_dropdown_items' => [
                'trigger_sr_only' => 'More',
                'remove' => 'Remove from favorites',
                'delete' => 'Delete',
            ],
        ],

        'team_switcher' => [
            'add_dialog' => [
                'title' => 'Add Team',
            ],

            'dropdown_menu_label' => 'Teams',
            'action_text' => 'Add team',
        ],
    ],

    'layouts' => [
        'auth' => [
            'invitation_modal' => [
                'title' => 'Invite members to team',
            ]
        ],

        'profile' => [
            'go_back' => 'Go back',
        ]
    ],

    'pages' => [
        'auth' => [
            'confirm_pass' => [
                'head_title' => 'Подтвердите пароль',
                'card_desc' => 'Это защищённая область приложения. Пожалуйста, подтвердите свой пароль перед продолжением.',

                'form' => [
                    'password' => 'Пароль',
                    'confirm' => 'Подтвердить',

                    'errors' => [
                        'password' => 'Неверный пароль',
                    ],
                ],
            ],

            'forgot_pass' => [
                'head_title' => 'Забыли пароль',
                'card_desc' => 'Забыли пароль? Не проблема. Укажите свой email, и мы отправим вам ссылку для сброса пароля, по которой вы сможете установить новый.',

                'form' => [
                    'email' => 'Email',
                    'confirm' => 'Отправить ссылку для сброса',

                    'errors' => [
                        'email' => 'Неверный email',
                    ],
                ],
            ],

            'login' => [
                'head_title' => 'Вход',

                'card_title' => 'Вход в Env',
                'card_desc' => 'Добро пожаловать в защищённое, мощное и полностью приватное рабочее пространство',

                'form' => [
                    'email' => 'Email',
                    'password' => 'Пароль',
                    'remember' => 'Запомнить меня',

                    'confirm' => 'Войти',

                    'errors' => [
                        'email' => 'Неверный email',
                        'password' => 'Неверный пароль',
                    ],

                    'links' => [
                        'forgot_pass' => 'Забыли пароль?',
                        'have_account' => [
                            'question' => 'Нет аккаунта?',
                            'link' => 'Зарегистрироваться',
                        ]
                    ],
                ],
            ],

            'register' => [ // вероятно, опечатка — должно быть 'register'
                'head_title' => 'Регистрация',

                'card_title' => 'Регистрация в Env',
                'card_desc' => 'Создайте аккаунт в защищённом, мощном и полностью приватном рабочем пространстве',

                'form' => [
                    'name' => 'Имя',
                    'email' => 'Email',
                    'password' => 'Пароль',
                    'confirm_password' => 'Подтвердите пароль',
                    'genders' => [
                        'male' => 'Мужской',
                        'female' => 'Женский',
                    ],

                    'confirm' => 'Зарегистрироваться',

                    'errors' => [
                        'name' => 'Неверное имя',
                        'email' => 'Неверный email',
                        'password' => 'Неверный пароль',
                        'confirm_password' => 'Пароли не совпадают',
                    ],

                    'links' => [
                        'registered' => 'Уже зарегистрированы?',
                    ],
                ],
            ],

            'reset_pass' => [
                'head_title' => 'Сброс пароля',

                'card_title' => 'Сброс пароля',

                'form' => [
                    'email' => 'Email',
                    'password' => 'Пароль',
                    'confirm_password' => 'Подтвердите пароль',

                    'confirm' => 'Сбросить пароль',

                    'errors' => [
                        'email' => 'Неверный email',
                        'password' => 'Неверный пароль',
                        'confirm_password' => 'Пароли не совпадают',
                    ],
                ],
            ],

            'verify_email' => [
                'head_title' => 'Подтверждение email',

                'card_desc' => 'Спасибо за регистрацию! Прежде чем начать, пожалуйста, подтвердите свой email, кликнув по ссылке, отправленной на ваш адрес. Если вы не получили письмо — мы можем отправить его повторно.',
                'status' => 'Новая ссылка для подтверждения была отправлена на указанный вами email.',

                'form' => [
                    'resend' => 'Отправить письмо повторно',
                    'logout' => 'Выйти',
                ],
            ],
        ],

        'confirmation' => [
            'invitation' => [
                'head_title' => 'Приглашение в команду',

                'card_title' => 'Приглашение',
                'card_desc' => 'Вас пригласили в команду :team_name в роли :team_role',

                'accept' => 'Принять',
                'decline' => 'Отклонить',
            ],
        ],

        'profile' => [
            'head_title' => 'Профиль',
            'sections' => [
                'profile_info' => [
                    'card_title' => 'Информация профиля',
                    'card_desc' => 'Обновите информацию профиля и email вашего аккаунта.',

                    'form' => [
                        'name' => 'Имя',
                        'email' => 'Email',

                        'confirm' => 'Сохранить',

                        'unverified_email' => [
                            'title' => 'Ваш email не подтверждён.',
                            'link' => 'Нажмите здесь, чтобы отправить письмо повторно.',
                            'email_sent' => 'Новая ссылка для подтверждения отправлена на ваш email.',
                        ],

                        'errors' => [
                            'name' => 'Неверное имя',
                            'email' => 'Неверный email',
                        ],
                    ],
                ],

                'update_pass' => [
                    'card_title' => 'Обновление пароля',
                    'card_desc' => 'Убедитесь, что вы используете надёжный, длинный и случайный пароль для безопасности аккаунта.',

                    'form' => [
                        'current_pass' => 'Текущий пароль',
                        'new_pass' => 'Новый пароль',
                        'confirm_pass' => 'Подтвердите пароль',

                        'confirm' => 'Сохранить',

                        'errors' => [
                            'current_pass' => 'Неверный текущий пароль',
                            'new_pass' => 'Неверный новый пароль',
                            'confirm_pass' => 'Пароли не совпадают',
                        ],
                    ],
                ],

                'delete_profile' => [
                    'card_title' => 'Удаление аккаунта',
                    'card_desc' => 'После удаления аккаунта все его данные и ресурсы будут удалены без возможности восстановления. Перед удалением вы можете сохранить необходимую информацию.',

                    'dialog' => [
                        'title' => 'Вы действительно хотите удалить аккаунт?',
                        'desc' => 'После удаления аккаунта все данные будут удалены навсегда. Для подтверждения введите ваш пароль.',

                        'form' => [
                            'confirm_pass' => 'Подтвердите пароль',

                            'reject' => 'Отмена',
                            'confirm' => 'Удалить аккаунт',
                        ],
                    ],
                ],
            ],
        ],

        'dashboard' => [
            'api_keys' => [
                'head_title' => 'API-ключи',
                'page_title' => 'API-ключи',
                'action_text' => 'Добавить',
        
                'data_table' => [
                    'filters' => [
                        'users_filter' => [
                            'placeholder' => 'Пользователь',
                            'empty_list' => 'Ничего не найдено.',
                        ],
                    ],
        
                    'columns' => [
                        'api_key' => [
                            'title' => 'API-ключ',
                        ],
        
                        'user' => [
                            'title' => 'Пользователь',
                        ],
        
                        'status' => [
                            'title' => 'Статус',
                            'options' => [
                                'active' => 'активен',
                                'expired' => 'истёк',
                            ],
                        ],
        
                        'expires_at' => [
                            'title' => 'Истекает',
        
                            'options' => [
                                'without' => 'Без срока действия',
                                'with' => 'Истекает',
                            ],
                        ],
        
                        'actions' => [
                            'sr_only' => 'Открыть меню',
        
                            'items' => [
                                'regenerate' => [
                                    'title' => 'Сгенерировать заново',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Переменная будет удалена без возможности восстановления.',
                                    ],
                                ],
        
                                'deactivate' => [
                                    'title' => 'Отключить',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Переменная будет удалена без возможности восстановления.',
                                    ],
                                ],
        
                                'delete' => [
                                    'title' => 'Удалить',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Переменная будет удалена без возможности восстановления.',
                                    ],
                                ],
                            ],
                        ],
                    ],
        
                    'empty_list' => 'Нет результатов.',
                    'metadata' => ':shown из :total строк(и).',
                ],
            ],
        
            'invitations' => [
                'head_title' => 'Приглашения в команду',
                'page_title' => 'Приглашения',
                'action_text' => 'Пригласить участника',
        
                'data_table' => [
                    'columns' => [
                        'email' => [
                            'title' => 'Email',
                        ],
        
                        'team_role' => [
                            'title' => 'Роль в команде',
                        ],
        
                        'expires_at' => [
                            'title' => 'Истекает',
                        ],
        
                        'status' => [
                            'title' => 'Статус',
                            'options' => [
                                'accepted' => 'принято',
                                'pending' => 'в ожидании',
                                'expired' => 'истёк',
                                'declined' => 'отклонено',
                                'revoked' => 'отозвано',
                            ],
                        ],
        
                        'actions' => [
                            'sr_only' => 'Открыть меню',
        
                            'items' => [
                                'revoke' => [
                                    'title' => 'Отозвать',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Приглашение будет отозвано.',
                                    ],
                                ],
        
                                'resend' => [
                                    'title' => 'Отправить повторно',
                                    'modal' => [
                                        'title' => 'Отправить повторно приглашение для :email',
                                    ],
                                ],
                            ],
                        ],
                    ],
        
                    'empty_list' => 'Нет результатов.',
                ],
            ],
        
            'members' => [
                'head_title' => 'Участники команды',
                'page_title' => 'Участники',
        
                'data_table' => [
                    'columns' => [
                        'user' => [
                            'title' => 'Пользователь',
                        ],
        
                        'member_from' => [
                            'title' => 'Участник с',
                        ],
        
                        'expires_at' => [
                            'title' => 'Истекает',
                        ],
        
                        'team_role' => [
                            'switch_role_confirm' => [
                                'title' => 'Изменить роль пользователя',
                                'description' => 'Вы уверены, что хотите изменить роль этого пользователя? Это действие обновит его права и может повлиять на доступ к функциям.',
                            ],
                        ],
        
                        'actions' => [
                            'items' => [
                                'delete' => [
                                    'title' => 'Удалить',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Участник будет удалён без возможности восстановления.',
                                    ],
                                ],
                            ],
                        ],
                    ],
        
                    'empty_list' => 'Нет результатов.',
                ],
            ],
        
            'groups' => [
                'head_title' => 'Группы',
                'page_title' => 'Группы',
                'action_text' => 'Добавить',
        
                'data_table' => [
                    'columns' => [
                        'id' => [
                            'title' => 'ID',
                        ],
        
                        'group' => [
                            'title' => 'Группа',
                        ],
        
                        'members' => [
                            'title' => 'Участники',
                            'tooltip' => 'Управление участниками группы',
                        ],
        
                        'actions' => [
                            'sr_only' => 'Открыть меню',
        
                            'items' => [
                                'favorite' => [
                                    'title' => [
                                        'add' => 'Добавить в избранное',
                                        'remove' => 'Удалить из избранного',
                                    ],
                                ],
        
                                'edit' => [
                                    'title' => 'Редактировать',
        
                                    'modal' => [
                                        'title' => 'Добавить группу',
                                    ],
                                ],
        
                                'delete' => [
                                    'title' => 'Удалить',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Группа будет удалена без возможности восстановления.',
                                    ],
                                ],
                            ],
                        ],
                    ],
        
                    'empty_list' => 'Нет результатов.',
                    'metadata' => ':shown из :total строк(и).',
                ],
            ],
        
            'workspace' => [
                'head_title' => 'Рабочее пространство',
                'page_title' => 'Переменные окружения',
                'action_text' => 'Добавить',
        
                'data_table' => [
                    'filters' => [
                        'variables_filter' => [
                            'placeholder' => 'Фильтр по переменным...',
                        ],
        
                        'groups_filter' => [
                            'placeholder' => 'Все группы',
                            'search_placeholder' => 'Группа',
                        ],
        
                        'update_filter' => [
                            'placeholder' => 'Последнее обновление',
                            'options' => [
                                'asc' => 'Сортировка по возрастанию',
                                'desc' => 'Сортировка по убыванию',
                            ],
                        ],
                    ],
        
                    'columns' => [
                        'leading_action' => [
                            'tooltip' => [
                                'copy' => 'Скопировать "key=value"',
                                'copied' => 'Скопировано',
                            ],
                        ],
        
                        'actions' => [
                            'sr_only' => 'Открыть меню',
        
                            'items' => [
                                'edit' => [
                                    'title' => 'Редактировать',
        
                                    'modal' => [
                                        'title' => 'Добавить группу',
                                    ],
                                ],
        
                                'duplicate' => [
                                    'title' => 'Дублировать',
                                    'modal' => [
                                        'title' => 'Дублировать переменную окружения',
                                    ],
                                ],
        
                                'delete' => [
                                    'title' => 'Удалить',
                                    'confirmation' => [
                                        'title' => 'Вы уверены?',
                                        'desc' => 'Это действие необратимо. Переменная будет удалена без возможности восстановления.',
                                    ],
                                ],
                            ],
                        ],
                    ],
        
                    'empty_list' => 'Нет результатов.',
                    'metadata' => ':shown из :total строк(и).',
                ],
            ],
        ],        


        '' => '',
        '' => [],
    ],
];

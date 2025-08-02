<?php

return [
    'settings' => 'Настройки',
    'account' => 'Аккаунт',
    'api_keys' => 'API-ключи',
    'notifications' => 'Уведомления',
    'common' => 'Общие',
    'close' => 'Закрыть',
    'save' => 'Сохранить',
    'notify_when' => 'Уведомлять, когда :event',

    'global_roles' => [
        'member' => 'Участник',
        'admin' => 'Администратор',
        'owner' => 'Владелец',
    ],

    'modals' => [
        'members' => [
            'role' => 'Роль',
            'select_role' => 'Выберите роль',
            'member' => 'Участник',
            'member_email' => 'Email участника',
            'invite' => 'Пригласить',

            'errors' => [
                'email' => 'Некорректный email',
            ],
        ],
        'api_keys' => [
            'add' => 'Добавить',
            'update' => 'Обновить',
            'without_expiration' => 'Без срока действия',

            'date_defaults' => [
                '7_days' => '7 дней',
                '30_days' => '30 дней',
                '60_days' => '60 дней',
                '90_days' => '90 дней',
                'unlimit' => 'Бессрочно',
            ],

            'errors' => [
                'user' => 'Неверный пользователь',
                'expiration' => 'Неверная дата истечения',
            ],
        ],
        'confirm_alert' => [
            'cancel' => 'Отмена',
            'continue' => 'Продолжить',
        ],
        'env_var' => [
            'select_group' => 'Выберите группу',
            'key' => 'Ключ',
            'value' => 'Значение',
            'add' => 'Добавить',
            'update' => 'Обновить',

            'errors' => [
                'key' => 'Неверный ключ',
                'value' => 'Неверное значение',
                'group_id' => 'Неверная группа',
            ],
        ],
        'group' => [
            'name' => 'Dev, Prod, ...',
            'add' => 'Добавить',
            'update' => 'Обновить',

            'errors' => [
                'name' => 'Неверное имя',
            ],
        ],
        'group_users' => [
            'title' => 'Управление пользователями группы :group_name',
            'search' => 'Поиск пользователя...',
            'group_members' => 'Участники группы',
            'team_members' => 'Участники команды',
            'empty_team_members' => 'Нет участников',
            'cancel' => 'Отмена',
            'update' => 'Обновить',
        ],
        'settings' => [
            'title' => 'Настройки',

            'sections' => [
                'common' => 'Общие',
                'api_keys' => 'API-ключи',
                'notifications' => 'Уведомления',
            ],

            'common' => [
                'theme' => [
                    'title' => 'Тема',
                    'variants' => [
                        'light' => 'Светлая',
                        'dark' => 'Тёмная',
                        'system' => 'Системная',
                    ],
                ],
                'language' => [
                    'title' => 'Язык',
                    'variants' => [
                        'russian' => 'Русский',
                        'english' => 'Английский',
                    ],
                ],
            ],

            'api_keys' => [
                'deactivation_confirm' => [
                    'title' => 'Отключить API-ключ',
                    'description' => 'Вы уверены, что хотите отключить этот API-ключ? После отключения доступ по этому ключу будет заблокирован и не подлежит восстановлению.',
                ],

                'empty_list' => 'У вас нет активных API-ключей. Чтобы получить ключ, обратитесь к администратору.',
                'expires_at' => 'Истекает',
                'no_expiration' => 'Без срока действия',
                'revoke' => 'Отозвать',
                'inactive' => 'Неактивен',
            ],

            'notifications' => [
                'settings' => [
                    'add_to_group' => 'Уведомлять, когда вас добавляют в группу',
                    'add_to_team' => 'Уведомлять, когда вас добавляют в команду',
                    'remove_from_group' => 'Уведомлять, когда вас удаляют из группы',
                    'remove_from_team' => 'Уведомлять, когда вас удаляют из команды',
                    'role_change' => 'Уведомлять об изменении вашей роли',
                    'variable_modified' => 'Уведомлять об изменении переменных',
                ],

                'toggle_confirm' => [
                    'title' => 'Подтверждение изменения настроек',
                    'activate_description' => 'Вы уверены, что хотите включить эту настройку? Изменения вступят в силу немедленно.',
                    'deactivate_description' => 'Вы уверены, что хотите отключить эту настройку? Изменения вступят в силу немедленно.',
                ],

                'errors' => [
                    'change_notifications' => 'Ошибка при изменении настроек уведомлений',
                ],
            ],

            'errors' => [
                'load_api_keys' => 'Ошибка при загрузке API-ключей',
                'load_settings' => 'Ошибка при загрузке настроек',
            ],
        ],
        'team' => [
            'team' => 'Команда',
            'type' => 'Тип',
            'add' => 'Добавить',

            'errors' => [
                'name' => 'Неверное имя',
                'type' => 'Неверный тип',
            ],
        ],
    ],

    'profile_menu' => [
        'account' => 'Мой аккаунт',
        'profile' => 'Профиль',
        'billing' => 'Оплата',
        'settings' => 'Настройки',
        'support' => 'Поддержка',
        'api' => 'API',
        'logout' => 'Выйти',
    ],
    
    'sidebar' => [
        'nav_items' => [
            'workspace' => 'Рабочее пространство',
            'groups' => 'Группы',
            'members' => 'Участники',
            'invitations' => 'Приглашения',
            'api_keys' => 'API-ключи',
            'support' => 'Поддержка',
            'feedback' => 'Обратная связь',
        ],
    
        'fav_groups' => [
            '' => '', // Пустое значение можно оставить без перевода
            'delete_confirm' => [
                'title' => 'Вы уверены?',
                'description' => 'Это действие необратимо. Группа будет окончательно удалена, а её данные удалены с наших серверов.',
            ],
    
            'create_dialog' => [
                'title' => 'Создать группу',
            ],
    
            'group_label' => 'Избранные группы',
            'group_action' => [
                'title' => 'Добавить группу',
                'action_text' => 'Добавить группу',
            ],
    
            'empty_list' => [
                'message' => 'Нет избранных групп',
                'tooltip_text' => 'Вы можете добавить группы в избранное на странице групп',
            ],
    
            'group_dropdown_items' => [
                'trigger_sr_only' => 'Больше',
                'remove' => 'Удалить из избранного',
                'delete' => 'Удалить',
            ],
        ],
    
        'team_switcher' => [
            'add_dialog' => [
                'title' => 'Добавить команду',
            ],
    
            'dropdown_menu_label' => 'Команды',
            'action_text' => 'Добавить команду',
        ],
    ],
    
    'layouts' => [
        'auth' => [
            'invitation_modal' => [
                'title' => 'Пригласить участников в команду',
            ]
        ],
    
        'profile' => [
            'go_back' => 'Назад',
        ]
    ],    

    'pages' => [
        'auth' => [
            'confirm_pass' => [
                'head_title' => 'Confirm Password',
                'card_desc' => 'This is a secure area of the application. Please confirm your password before continuing.',

                'form' => [
                    'password' => 'Password',
                    'confirm' => 'Confirm',

                    'errors' => [
                        'password' => 'Wrong password',
                    ],
                ],
            ],

            'forgot_pass' => [
                'head_title' => 'Forgot Password',
                'card_desc' => 'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',

                'form' => [
                    'email' => 'Email',
                    'confirm' => 'Email Password Reset Link',

                    'errors' => [
                        'email' => 'Wrong email',
                    ],
                ],
            ],

            'login' => [
                'head_title' => 'Log in',

                'card_title' => 'Login to Env',
                'card_desc' => 'Welcome to a workspace that\'s secure, powerfull and totally private',

                'form' => [
                    'email' => 'Email',
                    'password' => 'Password',
                    'remember' => 'Remember me',

                    'confirm' => 'Log in',

                    'errors' => [
                        'email' => 'Wrong email',
                        'password' => 'Wrong password',
                    ],

                    'links' => [
                        'forgot_pass' => 'Forgot your password?',
                        'have_account' => [
                            'question' => 'Don\'t have an account?',
                            'link' => 'Sign Up',
                        ]
                    ],
                ],
            ],

            'register' => [
                'head_title' => 'Register',

                'card_title' => 'Register in Env',
                'card_desc' => 'Create account in a workspace that\'s secure, powerfull and totally private',

                'form' => [
                    'name' => 'Name',
                    'email' => 'Email',
                    'password' => 'Password',
                    'confirm_password' => 'Confirm Password',
                    'genders' => [
                        'male' => 'Male',
                        'female' => 'Female',
                    ],

                    'confirm' => 'Register',

                    'errors' => [
                        'name' => 'Wrong name',
                        'email' => 'Wrong email',
                        'password' => 'Wrong password',
                        'password' => 'Passwrord does not match',
                    ],

                    'links' => [
                        'registered' => 'Already registered?',
                    ],
                ],
            ],

            'reset_pass' => [
                'head_title' => 'Reset Password',

                'card_title' => 'Reset Password',

                'form' => [
                    'email' => 'Email',
                    'password' => 'Password',
                    'confirm_password' => 'Confirm Password',

                    'confirm' => 'Reset Password',

                    'errors' => [
                        'email' => 'Wrong email',
                        'password' => 'Wrong password',
                        'password' => 'Passwrord does not match',
                    ],
                ],
            ],

            'verify_email' => [
                'head_title' => 'Email Verification',

                'card_desc' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
                'status' => 'A new verification link has been sent to the email address you provided during registration.',

                'form' => [
                    'resend' => 'Resend Verification Email',
                    'logout' => 'Log Out',
                ],
            ],
        ],

        'confirmation' => [
            'invitation' => [
                'head_title' => 'Invitation to team',

                'card_title' => 'Invitation',
                'card_desc' => 'You have been invited to :team_name team as a :team_role',

                'accept' => 'Accept',
                'decline' => 'Decline',
            ],
        ],

        'profile' => [
            'head_title' => 'Profile',
            'sections' => [
                'profile_info' => [
                    'card_title' => 'Profile Information',
                    'card_desc' => 'Update your account\'s profile information and email address.',

                    'form' => [
                        'name' => 'Name',
                        'email' => 'Email',

                        'confirm' => 'Save',

                        'unverified_email' => [
                            'title' => 'Your email address is unverified.',
                            'link' => 'Click here to re-send the verification email.',
                            'email_sent' => 'A new verification link has been sent to your email address.',
                        ],

                        'errors' => [
                            'name' => 'Wrong name',
                            'email' => 'Wrong email',
                        ],
                    ],
                ],

                'update_pass' => [
                    'card_title' => 'Update Password',
                    'card_desc' => 'Ensure your account is using a long, random password to stay secure.',

                    'form' => [
                        'current_pass' => 'Current Password',
                        'new_pass' => 'New Password',
                        'confirm_pass' => 'Confirm Password',

                        'confirm' => 'Save',

                        'errors' => [
                            'current_pass' => 'Wrong Current Password',
                            'new_pass' => 'Wrong New Password',
                            'confirm_pass' => 'Wrong Confirm Password',
                        ],
                    ],
                ],

                'delete_profile' => [
                    'card_title' => 'Delete Account',
                    'card_desc' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.',

                    'dialog' => [
                        'title' => 'Are you sure you want to delete your account?',
                        'desc' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',

                        'form' => [
                            'confirm_pass' => 'Confirm Password',

                            'reject' => 'Cancel',
                            'confirm' => 'Delete Account',
                        ],
                    ],
                ],

            ],
        ],

        'dashboard' => [
            'api_keys' => [
                'head_title' => 'Api Keys',
                'page_title' => 'Api Keys',
                'action_text' => 'Add',

                'data_table' => [
                    'filters' => [
                        'users_filter' => [
                            'placeholder' => 'User',
                            'empty_list' => 'No results found.',
                        ],
                    ],

                    'columns' => [
                        'api_key' => [
                            'title' => 'Api Key'
                        ],

                        'user' => [
                            'title' => 'User'
                        ],

                        'status' => [
                            'title' => 'Status',

                            'options' => [
                                'active' => 'active',
                                'expired' => 'expired',
                            ],
                        ],

                        'expires_at' => [
                            'title' => 'Expires At',

                            'options' => [
                                'without' => 'Without expiration',
                                'with' => 'Expires at',
                            ],
                        ],

                        'actions' => [
                            'sr_only' => 'Open menu',

                            'items' => [
                                'regenerate' => [
                                    'title' => 'Regenerate',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will permanently delete variable and remove it data from our servers.',
                                    ],
                                ],

                                'deactivate' => [
                                    'title' => 'Deactivate',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will permanently delete variable and remove it data from our servers.',
                                    ],
                                ],

                                'delete' => [
                                    'title' => 'Delete',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will permanently delete variable and remove it data from our servers.',
                                    ],
                                ],
                            ],
                        ],
                    ],

                    'empty_list' => 'No results.',
                    'metadata' => ':shown of :total row(s).',
                ],
            ],

            'invitations' => [
                'head_title' => 'Team Invitations',
                'page_title' => 'Invitations',
                'action_text' => 'Invite Member',

                'data_table' => [
                    'columns' => [
                        'email' => [
                            'title' => 'Email',
                        ],

                        'team_role' => [
                            'title' => 'Team Role',
                        ],

                        'expires_at' => [
                            'title' => 'Expires At',
                        ],

                        'status' => [
                            'title' => 'Status',

                            'options' => [
                                'accepted' => 'accepted',
                                'pending' => 'pending',
                                'expired' => 'expired',
                                'declined' => 'declined',
                                'revoked' => 'revoked',
                            ],
                        ],

                        'actions' => [
                            'sr_only' => 'Open menu',

                            'items' => [
                                'revoke' => [
                                    'title' => 'Revoke',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will revoke invitation.',
                                    ],
                                ],

                                'resend' => [
                                    'title' => 'Resend',
                                    'modal' => [
                                        'title' => 'Resend initation to :email',
                                    ],
                                ],
                            ],
                        ],
                    ],

                    'empty_list' => 'No results.',
                ],
            ],

            'members' => [
                'head_title' => 'Team Members',
                'page_title' => 'Members',

                'data_table' => [
                    'columns' => [
                        'user' => [
                            'title' => 'User',
                        ],

                        'member_from' => [
                            'title' => 'Member From',
                        ],

                        'expires_at' => [
                            'title' => 'Expires At',
                        ],

                        'team_role' => [
                            'switch_role_confirm' => [
                                'title' => 'Change User Role',
                                'description' => 'Are you sure you want to change this user\'s role? This action will update their permissions within the team and may affect their access to certain features.',
                            ],
                        ],

                        'actions' => [
                            'items' => [
                                'delete' => [
                                    'title' => 'Delete',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will permanently delete member and remove it data from our servers.',
                                    ],
                                ],
                            ],
                        ],
                    ],

                    'empty_list' => 'No results.',
                ],
            ],

            'groups' => [
                'head_title' => 'Groups',
                'page_title' => 'Groups',
                'action_text' => 'Add',

                'data_table' => [
                    'columns' => [
                        'id' => [
                            'title' => 'ID'
                        ],

                        'group' => [
                            'title' => 'Group'
                        ],

                        'members' => [
                            'title' => 'Members',

                            'tooltip' => 'Manage group users'
                        ],

                        'actions' => [
                            'sr_only' => 'Open menu',

                            'items' => [
                                'favorite' => [
                                    'title' => [
                                        'add' => 'Add to favorite',
                                        'remove' => 'Remove from favorite'
                                    ],
                                ],

                                'edit' => [
                                    'title' => 'Edit',

                                    'modal' => [
                                        'title' => 'Add group',
                                    ],
                                ],

                                'delete' => [
                                    'title' => 'Delete',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will permanently delete group and remove it data from our servers.',
                                    ],
                                ],
                            ],
                        ],
                    ],

                    'empty_list' => 'No results.',
                    'metadata' => ':shown of :total row(s).',
                ],
            ],

            'workspace' => [
                'head_title' => 'Workspace',
                'page_title' => 'Environmet variables',
                'action_text' => 'Add',

                'data_table' => [
                    'filters' => [
                        'variables_filter' => [
                            'placeholder' => 'Filter variables...',
                        ],

                        'groups_filter' => [
                            'placeholder' => 'All groups',
                            'search_placeholder' => 'Group',
                        ],

                        'update_filter' => [
                            'placeholder' => 'Last Update',
                            'options' => [
                                'asc' => 'Sort ascendent',
                                'desc' => 'Sort descendent',
                            ],
                        ],
                    ],

                    'columns' => [
                        'leading_action' => [
                            'tooltip' => [
                                'copy' => 'Copy "key=value"',
                                'copied' => 'Copied',
                            ],
                        ],

                        'actions' => [
                            'sr_only' => 'Open menu',

                            'items' => [
                                'edit' => [
                                    'title' => 'Edit',

                                    'modal' => [
                                        'title' => 'Add group',
                                    ],
                                ],

                                'duplicate' => [
                                    'title' => 'Duplicate',
                                    'modal' => [
                                        'title' => 'Duplicate environment variable',
                                    ],
                                ],

                                'delete' => [
                                    'title' => 'Delete',
                                    'confirmation' => [
                                        'title' => 'Are you sure?',
                                        'desc' => 'This action cannot be undone. This will permanently delete variable and remove it data from our servers.',
                                    ],
                                ],
                            ],
                        ],
                    ],

                    'empty_list' => 'No results.',
                    'metadata' => ':shown of :total row(s).',
                ],
            ],
        ],


        '' => '',
        '' => [],
    ],
];

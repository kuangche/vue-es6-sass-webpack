<template>
    <div class="leftSide">
        <ul>
            <li>
                <router-link :to="'user'" :class="'manageNav'"><span>用户管理</span></router-link>
                <ul>
                    <router-link :to="'user'" tag="li"><a>用户信息</a></router-link>
                    <router-link :to="'role'" tag="li"><a>角色管理</a></router-link>
                </ul>
            </li>
        </ul>
    </div>
</template>

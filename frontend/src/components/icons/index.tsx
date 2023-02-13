type Props = {
    color?: string;
};

export const GoogleIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(0.42 0 0 0.42 12 12)">
                <g style="">
                    <g transform="matrix(1 0 0 1 0 0)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,193,7); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-24, -24)"
                            d="M 43.611 20.083 L 42 20.083 L 42 20 L 24 20 L 24 28 L 35.303 28 C 33.653999999999996 32.657 29.223 36 23.999999999999996 36 C 17.372999999999998 36 11.999999999999996 30.627 11.999999999999996 24 C 11.999999999999996 17.373 17.372999999999998 12 23.999999999999996 12 C 27.058999999999997 12 29.841999999999995 13.154 31.961 15.039 L 37.617999999999995 9.382 C 34.046 6.053 29.268 4 24 4 C 12.955 4 4 12.955 4 24 C 4 35.045 12.955 44 24 44 C 35.045 44 44 35.045 44 24 C 44 22.659 43.862 21.35 43.611 20.083 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -2.04 -12.24)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,61,0); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-21.96, -11.76)"
                            d="M 6.306 14.691 L 12.876999999999999 19.51 C 14.655 15.108 18.961 12 24 12 C 27.059 12 29.842 13.154 31.961 15.039 L 37.617999999999995 9.382 C 34.046 6.053 29.268 4 24 4 C 16.318 4 9.656 8.337 6.306 14.691 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -2.2 12.03)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(76,175,80); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-21.8, -36.03)"
                            d="M 24 44 C 29.166 44 33.86 42.023 37.409 38.808 L 31.218999999999998 33.57 C 29.211 35.091 26.715 36 24 36 C 18.798000000000002 36 14.381 32.683 12.717 28.054000000000002 L 6.195 33.079 C 9.505 39.556 16.227 44 24 44 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 10 5.41)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(25,118,210); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-34, -29.41)"
                            d="M 43.611 20.083 L 42 20.083 L 42 20 L 24 20 L 24 28 L 35.303 28 C 34.510999999999996 30.237000000000002 33.071999999999996 32.166 31.215999999999998 33.571 C 31.217 33.57 31.217999999999996 33.57 31.218999999999998 33.568999999999996 L 37.409 38.806999999999995 C 36.971 39.205 44 34 44 24 C 44 22.659 43.862 21.35 43.611 20.083 z"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const FileIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill={props.color ?? "#fff"}
                opacity="0"
            />

            <g transform="matrix(0.45 0 0 0.45 12 12)">
                <path
                    style={`stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${
                        props.color ?? "rgb(255,255,255)"
                    }; fill-rule: nonzero; opacity: 1;`}
                    transform=" translate(-24, -25)"
                    d="M 5.5 7 C 3.5850452 7 2 8.5850452 2 10.5 L 2 37.5 C 2 39.414955 3.5850452 41 5.5 41 L 20.564453 41 C 21.25216 42.191787 22.523388 43 24 43 C 25.476612 43 26.74784 42.191787 27.435547 41 L 42.5 41 C 44.414955 41 46 39.414955 46 37.5 L 46 10.5 C 46 8.5850452 44.414955 7 42.5 7 L 28 7 C 26.415161 7 25.007083 7.7052607 24 8.7910156 C 22.992917 7.7052607 21.584839 7 20 7 L 5.5 7 z M 5.5 10 L 20 10 C 21.398226 10 22.5 11.101774 22.5 12.5 L 22.5 38 L 5.5 38 C 5.2049548 38 5 37.795045 5 37.5 L 5 10.5 C 5 10.204955 5.2049548 10 5.5 10 z M 28 10 L 42.5 10 C 42.795045 10 43 10.204955 43 10.5 L 43 37.5 C 43 37.795045 42.795045 38 42.5 38 L 25.5 38 L 25.5 12.5 C 25.5 11.101774 26.601774 10 28 10 z M 9.5 15.5 C 8.959046125133643 15.492349565681769 8.455877953142583 15.776562944253993 8.183168417770215 16.243809274571493 C 7.910458882397847 16.711055604888994 7.910458882397847 17.288944395111006 8.183168417770215 17.756190725428507 C 8.455877953142583 18.223437055746007 8.959046125133643 18.507650434318233 9.5 18.5 L 18 18.5 C 18.540953874866357 18.507650434318233 19.044122046857417 18.223437055746007 19.316831582229785 17.756190725428507 C 19.589541117602153 17.288944395111006 19.589541117602153 16.711055604888994 19.316831582229785 16.243809274571493 C 19.044122046857417 15.776562944253993 18.540953874866357 15.492349565681767 18 15.5 L 9.5 15.5 z M 30 15.5 C 29.459046125133643 15.492349565681769 28.955877953142583 15.776562944253993 28.683168417770215 16.243809274571493 C 28.410458882397847 16.711055604888994 28.410458882397847 17.288944395111006 28.683168417770215 17.756190725428507 C 28.955877953142583 18.223437055746007 29.459046125133643 18.507650434318233 30 18.5 L 38.5 18.5 C 39.040953874866354 18.507650434318233 39.54412204685742 18.223437055746007 39.81683158222979 17.756190725428507 C 40.08954111760215 17.288944395111006 40.08954111760215 16.711055604888994 39.81683158222979 16.243809274571493 C 39.54412204685742 15.776562944253993 39.040953874866354 15.492349565681767 38.5 15.5 L 30 15.5 z M 9.5 22.5 C 8.959046125133643 22.492349565681767 8.455877953142583 22.776562944253993 8.183168417770215 23.243809274571493 C 7.910458882397847 23.711055604888994 7.910458882397847 24.288944395111006 8.183168417770215 24.756190725428507 C 8.455877953142583 25.223437055746007 8.959046125133643 25.507650434318233 9.5 25.5 L 18 25.5 C 18.540953874866357 25.507650434318233 19.044122046857417 25.223437055746007 19.316831582229785 24.756190725428507 C 19.589541117602153 24.288944395111006 19.589541117602153 23.711055604888994 19.316831582229785 23.243809274571493 C 19.044122046857417 22.776562944253993 18.540953874866357 22.492349565681767 18 22.5 L 9.5 22.5 z M 30 22.5 C 29.459046125133643 22.492349565681767 28.955877953142583 22.776562944253993 28.683168417770215 23.243809274571493 C 28.410458882397847 23.711055604888994 28.410458882397847 24.288944395111006 28.683168417770215 24.756190725428507 C 28.955877953142583 25.223437055746007 29.459046125133643 25.507650434318233 30 25.5 L 38.5 25.5 C 39.040953874866354 25.507650434318233 39.54412204685742 25.223437055746007 39.81683158222979 24.756190725428507 C 40.08954111760215 24.288944395111006 40.08954111760215 23.711055604888994 39.81683158222979 23.243809274571493 C 39.54412204685742 22.776562944253993 39.040953874866354 22.492349565681767 38.5 22.5 L 30 22.5 z M 9.5 29.5 C 8.959046125133643 29.492349565681767 8.455877953142583 29.776562944253993 8.183168417770215 30.243809274571493 C 7.910458882397847 30.711055604888994 7.910458882397847 31.288944395111006 8.183168417770215 31.756190725428507 C 8.455877953142583 32.223437055746004 8.959046125133643 32.50765043431823 9.5 32.5 L 18 32.5 C 18.540953874866357 32.50765043431823 19.044122046857417 32.22343705574601 19.316831582229785 31.756190725428507 C 19.589541117602153 31.288944395111006 19.589541117602153 30.711055604888994 19.316831582229785 30.243809274571493 C 19.044122046857417 29.776562944253993 18.540953874866357 29.492349565681767 18 29.5 L 9.5 29.5 z M 30 29.5 C 29.459046125133643 29.492349565681767 28.955877953142583 29.776562944253993 28.683168417770215 30.243809274571493 C 28.410458882397847 30.711055604888994 28.410458882397847 31.288944395111006 28.683168417770215 31.756190725428507 C 28.955877953142583 32.223437055746004 29.459046125133643 32.50765043431823 30 32.5 L 36.5 32.5 C 37.040953874866354 32.50765043431823 37.54412204685742 32.22343705574601 37.81683158222979 31.756190725428507 C 38.08954111760215 31.288944395111006 38.08954111760215 30.711055604888994 37.81683158222979 30.243809274571493 C 37.54412204685742 29.776562944253993 37.040953874866354 29.492349565681767 36.5 29.5 L 30 29.5 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const OverviewIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#fff"
                opacity="0"
            />

            <g transform="matrix(1 0 0 1 12 12)">
                <path
                    style={`stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${
                        props.color ?? "rgb(255,255,255)"
                    }; fill-rule: nonzero; opacity: 1;`}
                    transform=" translate(-12, -12)"
                    d="M 2 2 L 2 3 L 2 13 L 11 13 L 11 2 L 2 2 z M 13 2 L 13 3 L 13 9 L 22 9 L 22 2 L 13 2 z M 4 4 L 9 4 L 9 11 L 4 11 L 4 4 z M 15 4 L 20 4 L 20 7 L 15 7 L 15 4 z M 13 11 L 13 12 L 13 22 L 22 22 L 22 11 L 13 11 z M 15 13 L 20 13 L 20 20 L 15 20 L 15 13 z M 2 15 L 2 16 L 2 22 L 11 22 L 11 15 L 2 15 z M 4 17 L 9 17 L 9 20 L 4 20 L 4 17 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const DownloadIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill={props.color ?? "#fff"}
                opacity="0"
            />

            <g transform="matrix(1.67 0 0 1.67 12 12)">
                <path
                    style={`stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;`}
                    transform=" translate(-7.5, -8)"
                    d="M 7 2 L 7 9.292969 L 4.351563 6.648438 L 3.648438 7.351563 L 7.5 11.207031 L 11.355469 7.351563 L 10.644531 6.648438 L 8 9.292969 L 8 2 Z M 3 13 L 3 14 L 12 14 L 12 13 Z"
                    stroke-linecap="round"
                    fill={props.color ?? "#fff"}
                />
            </g>
        </svg>
    );
};

export const EventsIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill={props.color ?? "#fff"}
                opacity="0"
            />

            <g transform="matrix(0.83 0 0 0.83 12 12)">
                <path
                    style={`stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${
                        props.color ?? "rgb(255,255,255)"
                    }; fill-rule: nonzero; opacity: 1;`}
                    transform=" translate(-12, -12)"
                    d="M 5 0 L 5 4 L 7 4 L 7 0 Z M 17 0 L 17 4 L 19 4 L 19 0 Z M 1 3 C 0.449219 3 0 3.449219 0 4 L 0 7 C 0 7.550781 0.449219 8 1 8 L 1 24 L 23 24 L 23 8 C 23.550781 8 24 7.550781 24 7 L 24 4 C 24 3.449219 23.550781 3 23 3 L 20 3 L 20 5 L 16 5 L 16 3 L 8 3 L 8 5 L 4 5 L 4 3 Z M 3 8 L 21 8 L 21 22 L 3 22 Z M 5 10 L 5 12 L 7 12 L 7 10 Z M 9 10 L 9 12 L 11 12 L 11 10 Z M 13 10 L 13 12 L 15 12 L 15 10 Z M 17 10 L 17 12 L 19 12 L 19 10 Z M 5 14 L 5 16 L 7 16 L 7 14 Z M 9 14 L 9 16 L 11 16 L 11 14 Z M 13 14 L 13 16 L 15 16 L 15 14 Z M 17 14 L 17 16 L 19 16 L 19 14 Z M 5 18 L 5 20 L 7 20 L 7 18 Z M 9 18 L 9 20 L 11 20 L 11 18 Z M 13 18 L 13 20 L 15 20 L 15 18 Z M 17 18 L 17 20 L 19 20 L 19 18 Z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const AnnouncementsIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill={props.color ?? "#fff"}
                opacity="0"
            />

            <g transform="matrix(1 0 0 1 12 12)">
                <path
                    style={`stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${
                        props.color ?? "rgb(255,255,255)"
                    }; fill-rule: nonzero; opacity: 1;`}
                    transform=" translate(-12, -12)"
                    d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 15 L 18 15 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 5 17 C 4.639364083422431 16.994899710454515 4.303918635428393 17.184375296169332 4.122112278513483 17.49587284971433 C 3.9403059215985725 17.80737040325933 3.940305921598573 18.192629596740673 4.122112278513484 18.50412715028567 C 4.303918635428394 18.815624703830668 4.639364083422431 19.005100289545485 5.000000000000001 19 L 10.269531 19 C 10.093441452828493 19.30388513057436 10.000480819308068 19.648782873395877 10 20 C 10 21.104569499661586 10.895430500338414 22 12 22 C 13.104569499661586 22 14 21.104569499661586 14 20 C 13.998925836746677 19.648605136192565 13.905288416045533 19.303695599346394 13.728516 19 L 19 19 C 19.360635916577568 19.005100289545485 19.696081364571608 18.815624703830668 19.877887721486516 18.50412715028567 C 20.059694078401428 18.19262959674067 20.059694078401428 17.80737040325933 19.877887721486516 17.49587284971433 C 19.696081364571608 17.184375296169332 19.360635916577568 16.994899710454515 19 17 L 5 17 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const TimetableIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill={props.color ?? "#fff"}
                opacity="0"
            />

            <g transform="matrix(0.39 0 0 0.39 12 12)">
                <path
                    style={`stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${
                        props.color ?? "rgb(255,255,255)"
                    }; fill-rule: nonzero; opacity: 1;`}
                    transform=" translate(-39.51, -40.51)"
                    d="M 17 15 C 15.343 15 14 16.343 14 18 L 14 56 C 14 57.657 15.343 59 17 59 L 39.550781 59 C 39.236781 57.681 38.734391 55.472 39.150391 53 L 32 53 L 32 45 L 42 45 L 44 43 L 44 33 L 52 33 L 52 40.150391 C 53.011 39.934391 55.676 39.838828 58 40.548828 L 58 18 C 58 16.343 56.657 15 55 15 L 17 15 z M 20 21 L 28 21 L 28 29 L 20 29 L 20 21 z M 32 21 L 40 21 L 40 29 L 32 29 L 32 21 z M 44 21 L 52 21 L 52 29 L 44 29 L 44 21 z M 20 33 L 28 33 L 28 41 L 20 41 L 20 33 z M 32 33 L 40 33 L 40 41 L 32 41 L 32 33 z M 54.019531 44.019531 C 47.939531 44.019531 43.019531 48.939531 43.019531 55.019531 C 43.019531 61.089531 47.939531 66.019531 54.019531 66.019531 C 60.099531 66.019531 65.019531 61.089531 65.019531 55.019531 C 65.019531 48.939531 60.099531 44.019531 54.019531 44.019531 z M 20 45 L 28 45 L 28 53 L 20 53 L 20 45 z M 54 48.25 C 55.1 48.25 56 49.15 56 50.25 L 56 54.5 L 58.199219 56.150391 C 59.079219 56.810391 59.259609 58.069219 58.599609 58.949219 C 58.209609 59.469219 57.61 59.75 57 59.75 C 56.58 59.75 56.160781 59.619609 55.800781 59.349609 L 52.800781 57.099609 C 52.300781 56.719609 52 56.13 52 55.5 L 52 50.25 C 52 49.15 52.9 48.25 54 48.25 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const UserIcon = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill={props.color ?? "#fff"}
                opacity="0"
            />

            <g transform="matrix(1.54 0 0 1.54 12 12)">
                <path
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-7.5, -7.5)"
                    d="M 7.5 1 C 3.917969 1 1 3.917969 1 7.5 C 1 11.082031 3.917969 14 7.5 14 C 11.082031 14 14 11.082031 14 7.5 C 14 3.917969 11.082031 1 7.5 1 Z M 7.5 2 C 10.542969 2 13 4.457031 13 7.5 C 13 8.839844 12.523438 10.0625 11.734375 11.015625 C 11.304688 9.796875 10.375 8.816406 9.1875 8.332031 C 9.683594 7.875 10 7.222656 10 6.5 C 10 5.125 8.875 4 7.5 4 C 6.125 4 5 5.125 5 6.5 C 5 7.222656 5.316406 7.875 5.8125 8.332031 C 4.625 8.816406 3.699219 9.796875 3.269531 11.015625 C 2.476563 10.0625 2 8.839844 2 7.5 C 2 4.457031 4.457031 2 7.5 2 Z M 7.5 5 C 8.335938 5 9 5.664063 9 6.5 C 9 7.335938 8.335938 8 7.5 8 C 6.664063 8 6 7.335938 6 6.5 C 6 5.664063 6.664063 5 7.5 5 Z M 7.5 9 C 9.199219 9 10.59375 10.207031 10.917969 11.808594 C 9.976563 12.554688 8.792969 13 7.5 13 C 6.207031 13 5.023438 12.554688 4.085938 11.808594 C 4.40625 10.207031 5.800781 9 7.5 9 Z"
                    stroke-linecap="round"
                    fill={props.color ?? "#000"}
                />
            </g>
        </svg>
    );
};

export const PreviewFileIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(0.67 0 0 0.67 12 12)">
                <path
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-15, -15)"
                    d="M 15 5 C 6.081703 5 0.32098813 14.21118 0.21679688 14.378906 C 0.07655339157438579 14.555562600617943 0.00015162265761634042 14.774443427056 2.7755575615628914e-17 15 C 0.00017740320419407226 15.193499134289754 0.05648999722563132 15.382790903583729 0.1621093800000003 15.544922 C 0.16340457965024266 15.546879578438555 0.16470666772100664 15.548832590543958 0.1660156200000005 15.550781 C 0.18320928 15.586261 5.0188313 25 15 25 C 24.938822 25 29.767326 15.678741 29.826172 15.564453 C 29.830152352227053 15.557987366632503 29.834058938900053 15.551476611080803 29.837891 15.544922 C 29.94351024874761 15.382790862180146 29.999822709861974 15.193499095928063 30 15 C 29.999964718006243 14.775345815648974 29.92428390006238 14.557247580173083 29.785156 14.380859 C 29.784505899328494 14.38020710129227 29.78385489870773 14.379556100671508 29.783203 14.378906 C 29.679012 14.21118 23.918297 5 15 5 z M 15 8 C 18.866 8 22 11.134 22 15 C 22 18.866 18.866 22 15 22 C 11.134 22 8 18.866 8 15 C 8 11.134 11.134 8 15 8 z M 15 12 C 13.34314575050762 12 12 13.34314575050762 12 15 C 12 16.65685424949238 13.34314575050762 18 15 18 C 16.65685424949238 18 18 16.65685424949238 18 15 C 18 13.34314575050762 16.65685424949238 12 15 12 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const SettingIcons = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#fff"
                opacity="0"
            />

            <g transform="matrix(0.5 0 0 0.5 12 12)">
                <path
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-24, -24)"
                    d="M 39.139 26.282 C 38.426 25.759 38 24.919 38 24.034 C 38 23.148999999999997 38.426 22.308999999999997 39.138 21.787 L 42.431999999999995 19.372 C 42.956999999999994 18.986 43.17399999999999 18.307 42.968999999999994 17.688 C 42.120999999999995 15.139999999999999 40.779999999999994 12.815999999999999 38.98199999999999 10.779 C 38.54899999999999 10.291 37.85099999999999 10.137 37.25399999999999 10.399 L 33.54499999999999 12.03 C 32.73699999999999 12.386 31.79599999999999 12.334999999999999 31.02899999999999 11.892 C 30.26299999999999 11.45 29.748999999999988 10.661999999999999 29.65199999999999 9.783 L 29.20599999999999 5.710999999999999 C 29.134999999999987 5.063 28.652999999999988 4.534999999999999 28.01499999999999 4.404 C 25.41799999999999 3.8729999999999998 22.68899999999999 3.864 20.04599999999999 4.394 C 19.40399999999999 4.523 18.92099999999999 5.051 18.849999999999987 5.702 L 18.407999999999987 9.748000000000001 C 18.310999999999986 10.628000000000002 17.796999999999986 11.416 17.028999999999986 11.858 C 16.262999999999984 12.3 15.324999999999985 12.353 14.513999999999985 11.996 L 10.784999999999986 10.356 C 10.192999999999985 10.094 9.492999999999986 10.246 9.059999999999986 10.733 C 7.255999999999986 12.762 5.9089999999999865 15.083 5.051999999999986 17.629 C 4.843999999999986 18.247 5.059999999999986 18.93 5.586999999999986 19.317 L 8.859999999999987 21.717 C 9.574 22.241 10 23.081 10 23.966 C 10 24.851000000000003 9.574 25.691000000000003 8.862 26.213 L 5.568 28.628 C 5.042999999999999 29.014 4.826 29.693 5.031 30.312 C 5.879 32.86 7.22 35.184 9.018 37.221000000000004 C 9.451 37.71 10.151 37.865 10.746 37.601000000000006 L 14.455 35.970000000000006 C 15.263 35.614000000000004 16.203 35.665000000000006 16.971 36.108000000000004 C 17.737000000000002 36.550000000000004 18.251 37.338 18.348 38.217000000000006 L 18.794 42.28900000000001 C 18.865000000000002 42.93700000000001 19.347 43.46500000000001 19.985 43.59600000000001 C 21.299 43.864 22.649 44 24 44 C 25.318 44 26.648 43.867 27.953 43.605 C 28.595 43.476 29.078 42.94799999999999 29.149 42.297 L 29.592000000000002 38.251 C 29.689000000000004 37.370999999999995 30.203000000000003 36.583 30.971000000000004 36.141 C 31.737000000000002 35.699999999999996 32.676 35.647999999999996 33.486000000000004 36.003 L 37.215 37.643 C 37.809000000000005 37.906 38.507000000000005 37.754 38.940000000000005 37.266 C 40.74400000000001 35.236999999999995 42.09100000000001 32.916 42.94800000000001 30.369999999999997 C 43.156000000000006 29.752 42.940000000000005 29.069 42.41300000000001 28.682 L 39.139 26.282 z M 24 31 C 20.134 31 17 27.866 17 24 C 17 20.134 20.134 17 24 17 C 27.866 17 31 20.134 31 24 C 31 27.866 27.866 31 24 31 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const MenuIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(1 0 0 1 12 12)">
                <g style="">
                    <g transform="matrix(1 0 0 1 0 0)">
                        <path
                            style="stroke: none; stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-12, -12)"
                            d="M 0 0 L 24 0 L 24 24 L 0 24 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 0 -4)">
                        <line
                            style="stroke: rgb(33,33,33); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            x1="-8"
                            y1="0"
                            x2="8"
                            y2="0"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 0 4)">
                        <line
                            style="stroke: rgb(33,33,33); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            x1="-8"
                            y1="0"
                            x2="8"
                            y2="0"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const ArrowIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(0.83 0 0 0.83 12 12)">
                <path
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-15, -15)"
                    d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 21.627 8.373000000000001 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 19.707 15.707 L 13.707 21.707 C 13.512 21.902 13.256 22 13 22 C 12.744 22 12.488 21.902 12.293 21.707 C 11.902 21.316000000000003 11.902 20.684 12.293 20.293 L 17.586 15 L 12.293 9.707 C 11.902 9.316 11.902 8.684000000000001 12.293 8.293000000000001 C 12.684 7.902000000000001 13.315999999999999 7.902000000000001 13.706999999999999 8.293000000000001 L 19.707 14.293000000000001 C 20.098 14.684 20.098 15.316 19.707 15.707 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const CloseIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(0.83 0 0 0.83 12 12)">
                <path
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-16, -16)"
                    d="M 16 4 C 9.3844239 4 4 9.3844287 4 16 C 4 22.615571 9.3844239 28 16 28 C 22.615576 28 28 22.615571 28 16 C 28 9.3844287 22.615576 4 16 4 z M 16 6 C 21.534697 6 26 10.465307 26 16 C 26 21.534693 21.534697 26 16 26 C 10.465303 26 6 21.534693 6 16 C 6 10.465307 10.465303 6 16 6 z M 12.707031 11.292969 L 11.292969 12.707031 L 14.585938 16 L 11.292969 19.292969 L 12.707031 20.707031 L 16 17.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 17.414062 16 L 20.707031 12.707031 L 19.292969 11.292969 L 16 14.585938 L 12.707031 11.292969 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const FullScreenIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="scale-75"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="rgb(29,78,216)"
                opacity="0"
            />

            <g transform="matrix(1.43 0 0 1.43 12 12)">
                <g style="">
                    <g transform="matrix(1 0 0 1 5 -5)">
                        <path
                            style="stroke:rgb(29,78,216); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-12, -2)"
                            d="M 10.5 0.5 L 12.5 0.5 C 13.052284749830793 0.5 13.5 0.9477152501692063 13.5 1.4999999999999998 L 13.5 3.5"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -5 -5)">
                        <path
                            style="stroke:rgb(29,78,216); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-2, -2)"
                            d="M 0.5 3.5 L 0.5 1.5 C 0.5 0.9477152501692065 0.9477152501692065 0.5 1.5 0.5 L 3.5 0.5"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 5 5)">
                        <path
                            style="stroke:rgb(29,78,216); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-12, -12)"
                            d="M 10.5 13.5 L 12.5 13.5 C 13.052284749830793 13.5 13.5 13.052284749830793 13.5 12.5 L 13.5 10.5"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -5 5)">
                        <path
                            style="stroke:rgb(29,78,216); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-2, -12)"
                            d="M 0.5 10.5 L 0.5 12.5 C 0.5 13.052284749830793 0.9477152501692065 13.5 1.5 13.5 L 3.5 13.5"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const DownloadedIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(1 0 0 1 12 12)">
                <g style="">
                    <g transform="matrix(1 0 0 1 0 0)">
                        <path
                            style="stroke: none; stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-12, -12)"
                            d="M 0 0 L 24 0 L 24 24 L 0 24 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 0.5 0)">
                        <path
                            style="stroke: rgb(22, 163, 74); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-12.5, -12)"
                            d="M 5 12 L 10 17 L 20 7"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const QuickViewIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(1 0 0 1 12 12)">
                <path
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-12, -12)"
                    d="M 15 2 L 5 13 L 10 13 L 9 22 L 19 11 L 14 11 L 15 2 z"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
};

export const AndroidIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(0.31 0 0 0.31 12 12)">
                <g style="">
                    <g transform="matrix(1 0 0 1 5 -15.15)">
                        <linearGradient
                            id="SVGID_r4wzZI4nTYpRSYqL7WQ95a_5"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="matrix(1 0 0 1 0 0)"
                            x1="37"
                            y1="14.5"
                            x2="37"
                            y2="19.332"
                        >
                            <stop
                                offset="0%"
                                style="stop-color:rgb(109,199,255);stop-opacity: 1"
                            />
                            <stop
                                offset="100%"
                                style="stop-color:rgb(230,171,255);stop-opacity: 1"
                            />
                        </linearGradient>
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: url(#SVGID_r4wzZI4nTYpRSYqL7WQ95a_5); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-37, -16.85)"
                            d="M 37 14.854 C 35.89543050033841 14.854 35 15.749430500338413 35 16.854 C 35 17.958569499661586 35.89543050033841 18.854 37 18.854 C 38.10456949966159 18.854 39 17.958569499661586 39 16.854 C 39 15.749430500338413 38.10456949966159 14.854 37 14.854 Z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -5 -15.15)">
                        <linearGradient
                            id="SVGID_r4wzZI4nTYpRSYqL7WQ95b_6"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="matrix(1 0 0 1 0 0)"
                            x1="27"
                            y1="14.5"
                            x2="27"
                            y2="19.332"
                        >
                            <stop
                                offset="0%"
                                style="stop-color:rgb(109,199,255);stop-opacity: 1"
                            />
                            <stop
                                offset="100%"
                                style="stop-color:rgb(230,171,255);stop-opacity: 1"
                            />
                        </linearGradient>
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: url(#SVGID_r4wzZI4nTYpRSYqL7WQ95b_6); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-27, -16.85)"
                            d="M 27 14.854 C 25.895430500338414 14.854 25 15.749430500338413 25 16.854 C 25 17.958569499661586 25.895430500338414 18.854 27 18.854 C 28.104569499661586 18.854 29 17.958569499661586 29 16.854 C 29 15.749430500338413 28.104569499661586 14.854 27 14.854 Z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 0 0)">
                        <linearGradient
                            id="SVGID_r4wzZI4nTYpRSYqL7WQ95c_7"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="matrix(1 0 0 1 0 0)"
                            x1="32"
                            y1="5.25"
                            x2="32"
                            y2="59.232"
                        >
                            <stop
                                offset="0%"
                                style="stop-color:rgb(26,109,255);stop-opacity: 1"
                            />
                            <stop
                                offset="100%"
                                style="stop-color:rgb(200,34,255);stop-opacity: 1"
                            />
                        </linearGradient>
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: url(#SVGID_r4wzZI4nTYpRSYqL7WQ95c_7); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-32, -32)"
                            d="M 49 22 L 47 22 L 46.951 22 C 46.667 17.505 44.493 13.613 41.186 11.081 L 44.707 7.56 L 43.293 6.146 L 39.486 9.953 C 37.293 8.713 34.747 8 32 8 C 29.253 8 26.706 8.713 24.514 9.953 L 20.707 6.145999999999999 L 19.293 7.559999999999999 L 22.814 11.081 C 19.507 13.613 17.334 17.505 17.049 22 L 17 22 L 15 22 C 12.757 22 11 23.692 11 25.854 L 11 38.854 C 11 41.06 12.794 42.854 15 42.854 C 15.732 42.854 16 42.641999999999996 17 42.298 L 17 43.854 C 17 46.292 19 48.399 21 48.891999999999996 L 21 53.854 C 21 56.06 22.794 57.854 25 57.854 C 27.206 57.854 29 56.06 29 53.854 L 29 49 L 35 49 L 35 53.854 C 35 56.06 36.794 57.854 39 57.854 C 41.206 57.854 43 56.06 43 53.854 L 43 48.891999999999996 C 45 48.4 47 46.29299999999999 47 43.854 L 47 42.298 C 48 42.642 48.268 42.854 49 42.854 C 51.206 42.854 53 41.06 53 38.854 L 53 25.854 C 53 23.692 51.243 22 49 22 z M 32 10 C 38.953 10 44.469 15.193999999999999 44.964 22 L 19.036 22 C 19.531 15.194 25.047 10 32 10 z M 15 40.854 C 13.897 40.854 13 39.957 13 38.854 L 13 25.854 C 13 24.797 13.859 24 15 24 L 17 24 L 17 38.854 C 17 39.956 16.103 40.854 15 40.854 z M 27 53.854 C 27 54.957 26.103 55.854 25 55.854 C 23.897 55.854 23 54.957 23 53.854 L 23 49 L 27 49 L 27 53.854 z M 39 55.854 C 37.897 55.854 37 54.957 37 53.854 L 37 49 L 41 49 L 41 53.854 C 41 54.956 40.103 55.854 39 55.854 z M 45 43.854 C 45 45.56 43.626 47 42 47 L 22 47 C 20.374 47 19 45.56 19 43.854 L 19 38.854 L 19 24 L 45 24 L 45 38.854 L 45 43.854 z M 51 38.854 C 51 39.957 50.103 40.854 49 40.854 C 47.897 40.854 47 39.957 47 38.854 L 47 24 L 49 24 C 50.141 24 51 24.797 51 25.854 L 51 38.854 z"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const AppStoreIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
            />

            <g transform="matrix(0.2 0 0 0.2 12 12)">
                <g style="">
                    <g transform="matrix(1 0 0 1 -1.44 -1.5)">
                        <polygon
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(75,77,255); fill-rule: nonzero; opacity: 1;"
                            points="30.44,29.5 -30.44,29.5 -30.44,-29.5 30.06,-29.5 "
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -1.47 -1.5)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(67,67,191); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-48.53, -48.5)"
                            d="M 80.949 81 L 15 81 L 15 16 L 82.052 16 L 80.949 81 z M 21 75 L 75.051 75 L 75.94800000000001 22 L 21 22 L 21 75 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 3 3.5)">
                        <polygon
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(58,188,248); fill-rule: nonzero; opacity: 1;"
                            points="32,31.5 -32,31.5 -32,21.5 22,21.5 22,-31.5 32,-31.5 "
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -10.06 -6.31)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(237,247,245); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-39.94, -43.69)"
                            d="M 50.17 54.334 C 49.923 53.961000000000006 49.65 53.61000000000001 49.34 53.29900000000001 L 41.579 53.29900000000001 L 53.535 32.89500000000001 C 54.233 31.70400000000001 53.833 30.17200000000001 52.642999999999994 29.47400000000001 C 51.449999999999996 28.77600000000001 49.91799999999999 29.176000000000013 49.22299999999999 30.36700000000001 L 47.77299999999999 32.84000000000001 L 46.322999999999986 30.36500000000001 C 45.62599999999998 29.17300000000001 44.094999999999985 28.77500000000001 42.902999999999984 29.47200000000001 C 41.710999999999984 30.169000000000008 41.310999999999986 31.70000000000001 42.009999999999984 32.89200000000001 L 44.87599999999998 37.78400000000001 L 35.783999999999985 53.299000000000014 L 28.5 53.299000000000014 C 27.118 53.299000000000014 26 54.40700000000001 26 55.77200000000001 C 26 57.137000000000015 27.118 58.24600000000001 28.5 58.24600000000001 L 50.823 58.24600000000001 C 51.146 57.15800000000001 51.058 55.94200000000001 50.455 54.81600000000001 L 50.17 54.334 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 -17.28 14.27)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(237,247,245); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-32.72, -64.27)"
                            d="M 32.376 61.62 C 31.848 61.605 31.33 61.663 30.822999999999997 61.765 L 30.010999999999996 63.15 C 29.312999999999995 64.341 29.712999999999997 65.873 30.903999999999996 66.571 C 31.300999999999995 66.804 31.736999999999995 66.914 32.166 66.914 C 33.023999999999994 66.914 33.861 66.47 34.324 65.679 L 35.766 63.217 C 34.954 62.29 33.783 61.66 32.382999999999996 61.618 L 32.376 61.618 z"
                            stroke-linecap="round"
                        />
                    </g>
                    <g transform="matrix(1 0 0 1 10.47 4.21)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(237,247,245); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-60.47, -54.21)"
                            d="M 67.5 53.299 L 59.762 53.299 L 52.85 41.506 L 51.578 43.678 C 50.838 45.260999999999996 50.738 47.050999999999995 51.27 48.696 L 61.223 65.681 C 61.688 66.474 62.522999999999996 66.916 63.382 66.916 C 63.809999999999995 66.916 64.247 66.806 64.64399999999999 66.573 C 65.835 65.875 66.234 64.34299999999999 65.535 63.151999999999994 L 62.66 58.24699999999999 L 67.5 58.24699999999999 C 68.882 58.24699999999999 70 57.138999999999996 70 55.772999999999996 C 70 54.407 68.882 53.299 67.5 53.299 z"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

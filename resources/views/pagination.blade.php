@if ($paginator->hasPages())
    <div class="pagination-block centered-block">
        <ul class="pagination-list">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <li class="prev-page disabled" aria-disabled="true">

                </li>
            @else
                <li class="prev-page">
                    <a href="{{ $paginator->previousPageUrl() }}"></a>
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <li class="page-item disabled" aria-disabled="true"><span class="page-link">{{ $element }}</span></li>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <li class="current-page"><span>{{ $page }}</span></li>
                        @else
                            <li><a href="{{ $url }}">{{ $page }}</a></li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <li class="next-page">
                    <a href="{{ $paginator->nextPageUrl() }}"></a>
                </li>
            @else
                <li class="next-page disabled" aria-disabled="true">

                </li>
            @endif
        </ul>
    </div>
@endif
